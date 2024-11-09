import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { environment } from '../../../environments/environment';

interface titleObject {
  id: number;
  question: string;
  correct_answer: string;
  category: string;
  difficulty: string;
  type: string;
  incorrect_answers: string[];
  title_id: number;
  title: string;
  answers?: { answer: string; isCorrect: boolean }[];

}

interface UserAnswer {
  isCorrect: boolean;
  answer: string;
}
@Component({
  selector: 'app-playgame',
  standalone: true,
  imports: [],
  templateUrl: './playgame.component.html',
  styleUrl: './playgame.component.css'
})

export class PlaygameComponent implements OnInit {
  gameId: string | null = null;
  titleList: titleObject[] = [];
  userAnswers: UserAnswer[] = [];
  showPoint: boolean = false;
  showWarning: boolean = false;
  youPoint: number = 0;
  userProfile: any;

  constructor(private route: ActivatedRoute, private http: HttpClient,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    // Access the 'id' route parameter
    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id');
      console.log(this.gameId)
    });


    // Fetch the title list
    this.http.get<titleObject[]>(
      `${environment.apiUrl}/api/quiz_title?query=SELECT * FROM public.quiz_questions 
      left join public.quiz_title on public.quiz_title.id = public.quiz_questions.title_id 
      where public.quiz_questions.title_id = ${this.gameId}`)
      .subscribe(
        response => {
          this.titleList = response.map(q => ({
            ...q,
            question: this.decodeHtmlEntities(q.question),
            answers: this.shuffleAnswers(q.correct_answer, q.incorrect_answers || [])

          }));
          this.userAnswers = new Array(this.titleList.length).fill(null).map(() => ({ isCorrect: false, answer: '' }));

        },
        error => {
          console.error('Error fetching title list:', error);
        }
      );

    if (sessionStorage.getItem("loggedInUser") === null) {
      window.location.href = '/'
    };
    
    this.userProfile = JSON.parse(sessionStorage.getItem("loggedInUser") || "");



  }
  decodeHtmlEntities(str: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
  }
  shuffleAnswers(correctAnswer: string, incorrectAnswers: string[]): { answer: string; isCorrect: boolean }[] {
    const answers = [
      { answer: correctAnswer, isCorrect: true },
      ...incorrectAnswers.map(answer => ({ answer, isCorrect: false }))
    ];

    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }
  checkAnswer(isCorrect: boolean | undefined, questionno: number, answer: string): void {
    const answerIsCorrect = isCorrect ?? false;
    this.userAnswers[questionno] = {
      isCorrect: answerIsCorrect,
      answer: answer
    };

  }
  checkPoint(showpoint: boolean): void {
    const isAllAnswer = this.userAnswers.filter(item => item.answer === '')
    if (isAllAnswer.length === 0) {
      this.youPoint = this.userAnswers.filter(item => item.isCorrect === true).length;
      this.showPoint = true;
      this.showWarning = false;

    } else {
      this.showWarning = true;
    }
  }

  hendleOnTryAgian(tryagain: boolean): void {
    this.userAnswers = new Array(this.titleList.length).fill(null).map(() => ({ isCorrect: false, answer: '' }));
    this.showPoint = false;
    this.showWarning = false;
  }

  handelSavePoint(gamepoint: number, useremail: string, gamename: string): void {
    const body = {
      gamepoint: gamepoint,
      useremail: useremail,
      gamename: gamename
    }
    console.log('body', body)
    this.http.post(`${environment.apiUrl}/api/gamepoint`, body)
      .subscribe(response => {
        console.log('Questions saved to database:', response);
        this.showPopup('savepoint')

      }, error => {
        console.error('Error saving questions to database:', error);
        console.error('Error details:', error.error);
        // this.showPopup('isFailed', 0)

      });
  }

  showPopup(isSuccess: string) {
    if (isSuccess === 'savepoint') {
      this.dialog.open(PopupDialogComponent, {
        data: {
          message: 'Save Point Successful',
          status: true
        },
      })
    }
  }

}
