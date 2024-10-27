import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { environment } from '../../../environments/environment';

interface loginState {
  id: number;
  username: string;
  password: string;
}

@Component({
  selector: 'app-loginandsingin',
  standalone: true,
  templateUrl: './loginandsingin.component.html',
  styleUrls: ['./loginandsingin.component.css']
})


export class LoginandsinginComponent implements OnInit {
  isSignUpActive: boolean = false;
  loginState: loginState[] = []
  loginMessage: string = ''

  toggleSignUp() {
    this.isSignUpActive = true;
  }

  toggleSignIn() {
    this.isSignUpActive = false;
  }

  //get user login
  // ;
  constructor(private http: HttpClient,
    private dialog: MatDialog,
  ) { }
  ngOnInit(): void {

  }

  handelSingIn(username: string, password: string) {

    const url = `${environment.apiUrl}/api/quiz_login/quiz_login?username=${username}&password=${btoa(password)}`;
    this.http.get<loginState[]>(url)
      .subscribe({
        next: (response) => {
          this.loginState = response;
          if (response.length > 0) {
            sessionStorage.setItem("loggedInUser", JSON.stringify(response[0]));
            this.showPopup('logintrue')
          } else {
            this.showPopup('loginfalse')

          }
        }
      });
  }

  handleSignUp(username: string, email: string, password: string) {
    const userData = {
      username: username,
      email: email,
      password: btoa(password)
    };
    const response = {
      email: email,
      id: 0,
      password: btoa(password),
      username: username
    };

    this.http.post(`${environment.apiUrl}/api/singupuser`, userData)
      .subscribe(response => {
        console.log('User signed up successfully:', response);

      }, error => {
        console.error('Error during sign up:', error);
        console.error('Error details:', error.error.text);
        if (error.error.text === "user name saved successfully") {
          this.showPopup('createnew')
          sessionStorage.setItem("loggedInUser", JSON.stringify(response));

        }
        if (error.error.text === "The username is already taken") {
          this.showPopup('usernametaken')

        }
      });
  }


  showPopup(isSuccess: string) {
    console.log("isSuccess", isSuccess)
    if (isSuccess === 'logintrue') {
      this.dialog.open(PopupDialogComponent, {
        data: {
          message: 'Login Successful',
          status: true
        },
      }),
        localStorage.setItem('selectedCategory', 'Home');

      setTimeout(() => {
        this.dialog.closeAll();
        window.location.href = '/homepage';
      }, 2000);
    } else if (isSuccess === "loginfalse") {
      this.dialog.open(PopupDialogComponent, {
        data: {
          message: 'Login failed',
          status: false
        },
      })
    } else if (isSuccess === "createnew") {
      this.dialog.open(PopupDialogComponent, {
        data: {
          message: 'CONGRATULATIONS! You have now successfully registered!',
          status: true
        },
      }),
        localStorage.setItem('selectedCategory', 'Home');
      setTimeout(() => {
        this.dialog.closeAll();
        window.location.href = '/homepage';
      }, 2000);
    } else if (isSuccess === "usernametaken") {
      this.dialog.open(PopupDialogComponent, {
        data: {
          message: 'The username is already taken!',
          status: false
        },
      })
    }
    // setTimeout(() => {
    //   this.dialog.closeAll();
    //   window.location.href = '/homepage';
    // }, 2000);
  }





}
