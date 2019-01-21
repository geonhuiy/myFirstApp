import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Pic } from '../../interface/pic';
import { MediaProvider } from '../../providers/media/media';

@Component({

  selector: 'page-home',
  templateUrl: 'home.html',

})

export class HomePage {
  picArray: Pic[] = [];

  constructor(
    public navCtrl: NavController, private mediaProvider: MediaProvider) {
  }

  ngOnInit() {
    this.getAllFiles();
  }

  getAllFiles = () => {
    this.mediaProvider.getImagesMediaAPI().subscribe(
      (res: Pic[]) => {
        this.picArray = res.map((pic: Pic) => {
          pic.thumbnails = {
            '160': (pic.filename.split('.')[0] + '-tn160.png')
          };
          return pic;
        });
      },
      (err) => {
        console.log(err);
      },
    );
  }
}
