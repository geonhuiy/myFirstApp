import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { LoginResponse, RegisteredResponse, User } from '../../interface/media';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',

  template: `
    <form *ngIf="hasAccount" (ngSubmit)="login(); logForm()">
      <ion-item>
        <ion-label>Username</ion-label>
        <ion-input
          type="text"
          [(ngModel)]="userData.username"
          name="username"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label id="password">Password</ion-label>
        <ion-input
          type="text"
          [(ngModel)]="userData.password"
          name="password"
        ></ion-input>
      </ion-item>
      <button ion-button type="submit" block>Log In</button>
      <button ion-button (click)="hasAccount = false">
        Don't have an account? Click here
      </button>
    </form>

    <form *ngIf="!hasAccount" (ngSubmit)="register()">
      <ion-item>
        <ion-label id="registerUsername">Register Username</ion-label>
        <ion-input
          type="text"
          [(ngModel)]="registerData.username"
          name="username"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label id="password2">Register password</ion-label>
        <ion-input
          type="text"
          [(ngModel)]="registerData.password"
          name="password"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label id="password2">Confirm password</ion-label>
        <ion-input
          type="text"
          [(ngModel)]="confirmPassword.password"
          name="password"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Email</ion-label>
        <ion-input
          type="text"
          [(ngModel)]="registerData.email"
          name="email"
        ></ion-input>
      </ion-item>
      <button ion-button type="submit" block>Sign up</button>
      <button ion-button (click)="hasAccount = true">
        Already have an account? Click here
      </button>
    </form>
  `,
})
export class LoginRegisterPage {
  logForm() {
    console.log(this.userData);
  }

  userData: User = { username: null };
  registerData: User = { username: null };
  confirmPassword: User = { username: null };
  hasAccount = true;

  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider) {
  }

  login() {
    this.mediaProvider.login(this.userData).subscribe(
      (response: LoginResponse) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.user.user_id.toString());
        this.mediaProvider.loggedIn = true;
        // this.navCtrl.push(HomePage);
        this.navCtrl.parent.select(0);
      },
      error => {
        console.log(error);
      },
    );
  }

  register() {
    if (this.registerData.password !== this.confirmPassword.password) {
      console.log('Password does not match');
    } else {
      this.mediaProvider.register(this.registerData).subscribe(
        (response: RegisteredResponse) => {
          console.log(response);
          this.userData.username = this.registerData.username;
          this.userData.password = this.registerData.password;
          console.log(this.userData);
          this.mediaProvider.login(this.userData);
          this.mediaProvider.loggedIn = true;
          // this.navCtrl.push(HomePage);
          this.navCtrl.parent.select(0);
        },
        error => {
          if (error.status === 400) {
            console.log(error);
            document.getElementById('registerUsername').
              insertAdjacentHTML('afterbegin', 'This username is taken');
          }
          console.log(error);
        },
      );
    }
  }
}
