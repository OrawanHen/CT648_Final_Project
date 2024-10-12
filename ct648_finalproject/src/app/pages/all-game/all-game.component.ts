import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface titleObject {
  id: number;
  title: string;
  create_date: Date;
}

interface deleteState {
  message: string;
}


@Component({
  selector: 'app-all-game',
  standalone: true,
  imports: [],
  templateUrl: './all-game.component.html',
  styleUrl: './all-game.component.css',
})
export class AllGameComponent implements OnInit {
  titleList: titleObject[] = [];
  dateValue: Date = new Date();
  datemdY: string = '';
  now: Date = new Date();

  constructor(private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get<titleObject[]>(`${environment.apiUrl}/api/quiz_title`)
      .subscribe(response => {
        this.titleList = response
      })
  }

  formattedTimestamp(dateTime: Date | string): string {
    if (!(dateTime instanceof Date)) {
      dateTime = new Date(dateTime); // Try to convert to a Date object
    }

    if (isNaN(dateTime.getTime())) {
      return 'Invalid Date'; // Handle invalid date
    }

    const day = String(dateTime.getDate()).padStart(2, '0');
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = dateTime.getFullYear();

    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`; // Format as dd/MM/yyyy hh:mm:ss
  }

  confirmDelete(id: number) {
    console.log(id)
    this.http.delete<deleteState>(`${environment.apiUrl}/api/deletequestion/` + id)
      .subscribe(response => {
        console.log('response', response.message)
        if (response.message === "Record deleted successfully") {
          this.http.get<titleObject[]>(`${environment.apiUrl}/api/quiz_title`)
            .subscribe(response => {
              this.titleList = response

            })
        }

      });
  }
}
