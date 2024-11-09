import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
interface pointState {
  gamepoint: string;
  useremail: string;
  gamename: string;
  time : Date;

}

@Component({
  selector: 'app-gamepoint',
  standalone: true,
  imports: [],
  templateUrl: './gamepoint.component.html',
  styleUrl: './gamepoint.component.css'
})
export class GamepointComponent implements OnInit {
  pointState: pointState[] = []
  constructor(private http: HttpClient,
  ) { }
  ngOnInit(): void {
    this.http.get<pointState[]>(`${environment.apiUrl}/api/get/historypoint`)
      .subscribe(response => {
        console.log('response', response)
        this.pointState = response
        // this.titleList = response
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
}
