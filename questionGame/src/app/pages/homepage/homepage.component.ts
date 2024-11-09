import { Component, OnInit ,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface QuestionState {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];

}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})

export class HomepageComponent implements OnInit ,OnDestroy {
  questionList: QuestionState[] = [];
  slideIndex: number = 0;
  timer: any;
  slides: HTMLElement[] = [];
  userProfile: any;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get<{ results: QuestionState[] }>('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple')
      .subscribe(response => {
        console.log('response', response.results)
        this.questionList = response.results

      });
    this.userProfile = JSON.parse(sessionStorage.getItem("loggedInUser") || "");

  };

  ngOnDestroy() {
    clearTimeout(this.timer); // Clear the timeout when the component is destroyed
  }

}
