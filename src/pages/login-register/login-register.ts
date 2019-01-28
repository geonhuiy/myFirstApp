import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { User, LoginResponse, RegisteredResponse } from '../../interface/media';

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
    <form (ngSubmit)="login(); logForm()">
      <ion-item>
        <ion-label>Username</ion-label>
        <ion-input type="text" [(ngModel)]="userData.username"
                   name="username"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label id="password">Password</ion-label>
        <ion-input type="text" [(ngModel)]="userData.password"
                   name="password"></ion-input>
      </ion-item>
      <button ion-button type="submit" block>Log In</button>
    </form>

    <form (ngSubmit)="register()">
      <ion-item>
        <ion-label id="registerUsername">Register Username</ion-label>
        <ion-input type="text" [(ngModel)]="registerData.username"
                   name="username"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label id="password2">Register password</ion-label>
        <ion-input type="text" [(ngModel)]="registerData.password"
                   name="password"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Email</ion-label>
        <ion-input type="text" [(ngModel)]="registerData.email"
                   name="email"></ion-input>
      </ion-item>
      <button ion-button type="submit" block>Sign up</button>
    </form>
  `,

})
export class LoginRegisterPage {

  logForm() {
    console.log(this.userData);
  }

  userData: User = { username: null };
  registerData: User = { username: null };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
  ) {

  }

  ionViewDidLoad() {

  }

  login() {
    this.mediaProvider.login(this.userData).subscribe(
      (response: LoginResponse) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        this.mediaProvider.loggedIn = true;
        this.navCtrl.parent.select(0);
      },
      error => {
        console.log(error);
      });
  }

  register() {
    this.mediaProvider.register(this.registerData).subscribe(
      (response: RegisteredResponse) => {
        console.log(response);
        this.userData.username = this.registerData.username;
        this.userData.password = this.registerData.password;
        console.log(this.userData);
        this.mediaProvider.login(this.userData);
        this.mediaProvider.loggedIn = true;
        this.navCtrl.parent.select(0);
        // console.log(this.userData);
      },
      error => {
        if (error.status == 400) {
          console.log(this.registerData.username + 'already exists');
          document.getElementById('registerUsername').
            insertAdjacentHTML('afterbegin', 'This username is taken');
        }
        console.log(error);
      });
  }
}
