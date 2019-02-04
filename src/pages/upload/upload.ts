import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private mediaProvider: MediaProvider) {
  }

  filedata = '';
  file: File;
  title = '';
  description = '';

  ionViewDidLoad() {
    // Do something
  }

  handleChange($event) {
    // console.log($event.target.files[0]);
    this.file = $event.target.files[0];
    this.showPreview();
  }

  showPreview() {
    const reader = new FileReader();
    reader.onloadend = (evt) => {
      console.log(reader.result);
      this.filedata = reader.result;
    };
    reader.readAsDataURL(this.file);
  }

  upload() {
    const fd = new FormData();
    fd.append('title', this.title);
    fd.append('description', this.description);
    fd.append('file', this.file);
    this.mediaProvider.uploadMedia(fd).subscribe(
      res => {
        console.log(res);
        setTimeout(20000);
        this.navCtrl.pop().catch();
      },
    );
  }
}
