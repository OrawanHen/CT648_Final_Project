import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
interface loginState {
  id: number;
  username: string;
  password: string;
}
@Component({
  selector: 'app-popup-dialog',
  standalone: true,
  imports: [],
  templateUrl: './popup-dialog.component.html',
  styleUrl: './popup-dialog.component.css'
})
export class PopupDialogComponent {
  isSignUpActive: boolean = false;
  loginState: loginState[] = []
  loginMessage: string = ''

  constructor(private http: HttpClient,
    public dialogRef: MatDialogRef<PopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string , status : boolean}
  ) { }

  handelSingIn(username: string, password: string) {
    const url = `${environment.apiUrl}/api/quiz_login/quiz_login?username=${username}&password=${btoa(password)}`;
    this.http.get<loginState[]>(url)
      .subscribe({
        next: (response) => {
          this.loginState = response;
        }
      });
  }
  toggleSignUp() {
    this.isSignUpActive = true;
  }

  toggleSignIn() {
    this.isSignUpActive = false;
  }

  onClose(): void {
    this.dialogRef.close();
  }


}
