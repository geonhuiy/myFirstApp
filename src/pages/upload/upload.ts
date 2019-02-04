import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
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
  loading: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private mediaProvider: MediaProvider,
    private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Uploading media',
      spinner: 'ios',
    });
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
      this.filedata = reader.result;
    };

    if (this.file.type.includes('video')) {
      this.filedata = 'http://via.placeholder.com/500/200/000?text=Video';
    } else if (this.file.type.includes('audio')) {
      this.filedata = 'http://via.placeholder.com/500/200/000?text=Audio';
    } else {
      reader.readAsDataURL(this.file);
    }
  }

  upload() {
    // const filters = '<filters>';
    const fd = new FormData();
    fd.append('title', this.title);
    fd.append('description', this.description);
    fd.append('file', this.file);
    this.mediaProvider.uploadMedia(fd).subscribe(
      res => {
        console.log(res);
        this.loading.present();
        setTimeout(() => {
          this.loading.dismiss();
        }, 2000);
        this.navCtrl.pop().catch();
      },
    );
  }
}
