import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, Platform } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Chooser } from '@ionic-native/chooser';
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
    private loadingCtrl: LoadingController,
    private chooser: Chooser,
    private platform: Platform) {
    this.loading = this.loadingCtrl.create({
      content: 'Uploading media',
      spinner: 'ios',
    });
  }

  filedata = '';
  file: File;
  emptyFile = this.file;
  title = '';
  description = '';
  filter = {
    'brightness': '1',
    'contrast': '1',
    'saturation': '1',
    'warmth': '1',
  };
  mediaBlob: Blob;
  emptyBlob = this.mediaBlob;
  isPc = this.platform.is('core');
  isAndroid = this.platform.is('android');

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
    if (this.isPc) {
      if (this.file.type.includes('video')) {
        this.filedata = 'http://via.placeholder.com/500/200/000?text=Video';
      } else if (this.file.type.includes('audio')) {
        this.filedata = 'http://via.placeholder.com/500/200/000?text=Audio';
      } else {
        reader.readAsDataURL(this.file);
      }
    } else if (this.isAndroid) {
      if (this.mediaBlob.type.includes('video')) {
        this.filedata = 'http://via.placeholder.com/500/200/000?text=Video';
      } else if (this.mediaBlob.type.includes('audio')) {
        this.filedata = 'http://via.placeholder.com/500/200/000?text=Audio';
      } else {
        reader.readAsDataURL(this.mediaBlob);
      }
    }
  }

  upload() {
    const fd = new FormData();
    fd.append('title', this.title);
    fd.append('description', this.description/*JSON.stringify(this.filter)*/);
    if (this.isPc) {
      fd.append('file', this.file);
    } else if (this.isAndroid) {
      fd.append('file', this.mediaBlob);
    }
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

  choose() {
    this.chooser.getFile('image/*,video/*,audio/*').
      then(
        file => {
          console.log(file ? file.name : 'filename');
          this.mediaBlob = new Blob([file.data],
            { type: file.mediaType });
          this.showPreview();
        }).catch(err => {
      // Do something
    });

  }

  resetBlob() {
    this.filedata = '';
    if (this.isAndroid) {
      this.mediaBlob = this.emptyBlob;
    } else if (this.isPc) {
      this.file = this.emptyFile;
    }
  }
}
