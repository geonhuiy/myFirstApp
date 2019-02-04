import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';
import { User } from '../../interface/media';
import { Observable } from 'rxjs';
import { Pic } from '../../interface/pic';
/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider) {
  }

  profile: Observable<User>;
  profilePic: string = '';

  ionViewDidEnter() {
    this.getUserProfile();
    this.getAllProfilePictures();
  }

  logout() {
    localStorage.removeItem('token');
    this.mediaProvider.loggedIn = false;
    this.navCtrl.parent.select(0);
    console.log('Logged out');
  }

  getUserProfile() {
    this.profile = this.mediaProvider.getUserProfile();
    console.log("Loaded user info");
  }

  getAllProfilePictures() {
    this.mediaProvider.getAllProfilePictures().subscribe(
      (res: Pic[]) => {
        // console.log(res, localStorage.getItem('user_id'));
        this.profilePic = res.filter(
          obj => {
            // console.log(obj.user_id.toString());
            return obj.user_id.toString() === localStorage.getItem('user_id');

          },
        ).map(
          object => object.filename,
        )[0];
        // console.log(this.profilePic);
        console.log("Loaded profile picture");
      },
    );
  }

}
