import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { environment } from '../../../environments/environment';
interface QuestionState {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers?: { answer: string; isCorrect: boolean }[];

}

interface UserAnswer {
  isCorrect: boolean;
  answer: string;
  isTryAgain: boolean;

}

interface SaveQuestionsResponse {
  message: string;
  quizTitleId: number;
}

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css'
})
export class NewGameComponent implements OnInit {
  questionList: QuestionState[] = [];
  userAnswers: UserAnswer[] = [];
  showPoint: boolean = false;
  showWarning: boolean = false;
  showInvalidApi: boolean = false;
  loading: boolean = false;
  showColorChang: boolean = true;
  youPoint: number = 0;
  constructor(private http: HttpClient,
    private dialog: MatDialog

  ) { }
  ngOnInit(): void {
    // this.http.get<{ results: QuestionState[] }>('https://opentdb.com/api.php?amount=5')
    //   .subscribe(response => {
    //     console.log('response', response.results)
    //     // this.questionList = response.results
    //     this.questionList = response.results.map(q => ({
    //       ...q,
    //       answers: this.shuffleAnswers(q.correct_answer, q.incorrect_answers || [])

    //     }));
    //     // this.userAnswers = new Array(this.questionList.length).fill(undefined);
    //     this.userAnswers = new Array(this.questionList.length).fill(null).map(() => ({ isCorrect: false, answer: '' }));

    //   })
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
      answer: answer,
      isTryAgain: false

    };
    if (this.showColorChang === false) {
      this.userAnswers[questionno] = {
        isCorrect: answerIsCorrect,
        answer: answer,
        isTryAgain: true
      };
    }
    console.log(this.userAnswers)

  }

  checkPoint(showpoint: boolean): void {
    const isAllAnswer = this.userAnswers.filter(item => item.answer === '')
    if (isAllAnswer.length === 0) {
      this.youPoint = this.userAnswers.filter(item => item.isCorrect === true).length;
      this.showPoint = true;
      this.showWarning = false;
      this.showColorChang = false;
      Object.keys(this.userAnswers).forEach((key : any) => {
        this.userAnswers[key].isTryAgain = false;
      });

    } else {
      this.showWarning = true;
    }
  }

  hendleOnTryAgian(tryagain: boolean): void {
    this.userAnswers = new Array(this.questionList.length).fill(null).map(() => ({ isCorrect: false, answer: '' ,isTryAgain: false}));
    this.showPoint = false;
    this.showWarning = false;
  }

  handelGetQuestionFromApi(api: string): void {
    this.http.get<{ results: QuestionState[] }>(api)
      .subscribe(response => {
        console.log('response', response.results)
        // this.questionList = response.results
        this.questionList = response.results.map(q => ({
          ...q,
          question: this.decodeHtmlEntities(q.question),
          answers: this.shuffleAnswers(q.correct_answer, q.incorrect_answers || [])

        }));
        // this.userAnswers = new Array(this.questionList.length).fill(undefined);
        this.userAnswers = new Array(this.questionList.length).fill(null).map(() => ({ isCorrect: false, answer: '' ,isTryAgain: false}));
        this.loading = false;
        this.showInvalidApi = false;

      },
        error => {
          this.showInvalidApi = true;
          this.loading = false;
          console.error('Error fetching data from API:', error);
        }
      )
  }


  onSubmit(event: Event, input: HTMLInputElement): void {
    event.preventDefault(); // Prevent form submission
    this.loading = true;
    const apiUrl = input.value; // Get the value from the input
    this.handelGetQuestionFromApi(apiUrl); // Use the input value
  }

  decodeHtmlEntities(str: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
  }

  handelSaveQuestionsToDatabase(questionList: QuestionState[]): void {
    this.http.post<SaveQuestionsResponse>(`${environment.apiUrl}/api/questions`, this.questionList)
      .subscribe(response => {
        console.log('Questions saved to database:', response);
        this.showPopup('isSuccess',response.quizTitleId)

      }, error => {
        console.error('Error saving questions to database:', error);
        console.error('Error details:', error.error);
        this.showPopup('isFailed' , 0)

      });
  }

  showPopup(isSuccess: string , quizTitleId : number) {
    console.log("isSuccess", isSuccess)
    if (isSuccess === 'isSuccess') {
      this.dialog.open(PopupDialogComponent, {
        data: {
          message: 'CONGRATULATIONS! Save questions Successful',
          status: true
        },
      }),
        setTimeout(() => {
          this.dialog.closeAll();
          window.location.href = `/playgame/${quizTitleId}`
        }, 2000);
    } else {
      this.dialog.open(PopupDialogComponent, {
        data: {
          message: 'Sorry! Save questions failed please try again !',
          status: false
        },
      })
    }
  }


}
