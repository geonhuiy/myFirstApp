import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginRegisterPage } from '../login-register/login-register';
import { ProfilePage } from '../profile/profile';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  Home = HomePage;
  Login = LoginRegisterPage;
  Profile = ProfilePage;

  isToken = localStorage.getItem('token');

  constructor(
    public navParams: NavParams,
    public mediaProvider: MediaProvider) {

  }

  ionViewDidLoad() {
    if (this.isToken !== 'undefined' &&
      this.isToken !== null) {
      console.log('There is a token');
      this.mediaProvider.loggedIn = true;
    } else {
      console.log('There is no token');
      this.mediaProvider.loggedIn = false;
    }
    console.log('ionViewDidLoad MenuPage');
  }

}
