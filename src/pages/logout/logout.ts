import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider) {
  }

  ionViewWillEnter() {
    this.logout();
  }

  logout() {
    localStorage.removeItem('token');
    this.mediaProvider.loggedIn = false;
    this.navCtrl.push(HomePage);
    console.log('Logged out');
  }
}
