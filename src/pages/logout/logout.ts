import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';

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
    public navCtrl: NavController, public navParams: NavParams,
    private mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }
  ionViewWillEnter() {
    this.logout();
  }
  logout() {
    /*if (localStorage.getItem('token') !== 'undefined' &&
      localStorage.getItem('token') !== null) {*/
      localStorage.removeItem('token');
      this.mediaProvider.loggedIn = false;
      this.navCtrl.parent.select(0);
      console.log('Logged out');

  }
}
