import { Component } from '@angular/core';
import { Pic } from '../../interface/pic';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from 'rxjs';
import { NavController } from 'ionic-angular';
import { UploadPage } from '../upload/upload';

@Component({

  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  picArray: Observable<Pic[]>;

  constructor(
    private mediaProvider: MediaProvider, private navCtrl: NavController) {
  }

  ionViewDidEnter() {
    this.getAllFiles();
  }

  getAllFiles = () => {
    this.picArray = this.mediaProvider.getImagesMediaAPI();
    console.log(this.picArray);
  };

  openUpload() {
    this.navCtrl.push(UploadPage);
  }
}
