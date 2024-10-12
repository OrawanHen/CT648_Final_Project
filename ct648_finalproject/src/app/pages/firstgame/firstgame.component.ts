import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}

@Component({
  selector: 'app-firstgame',
  standalone: true,
  imports: [],
  templateUrl: './firstgame.component.html',
  styleUrl: './firstgame.component.css'
})
export class FirstgameComponent implements OnInit {
  questionList: QuestionState[] = [];
  userAnswers: UserAnswer[] = [];
  showPoint: boolean = false;
  showWarning: boolean = false;
  youPoint: number = 0;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get<{ results: QuestionState[] }>('https://opentdb.com/api.php?amount=3&category=21&type=multiple')
      .subscribe(response => {
        this.questionList = response.results.map(q => ({
          ...q,
          question: this.decodeHtmlEntities(q.question),
          answers: this.shuffleAnswers(q.correct_answer, q.incorrect_answers || [])

        }));
        // this.userAnswers = new Array(this.questionList.length).fill(undefined);
        this.userAnswers = new Array(this.questionList.length).fill(null).map(() => ({ isCorrect: false, answer: '' }));

      })
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
    console.log(this.userAnswers)

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
    this.userAnswers = new Array(this.questionList.length).fill(null).map(() => ({ isCorrect: false, answer: '' }));
    this.showPoint = false;
    this.showWarning = false;
  }

}
