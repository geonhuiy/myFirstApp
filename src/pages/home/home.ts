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
        res.forEach((pic: Pic) => {
          this.mediaProvider.getSingleMedia(pic.file_id).subscribe(
            (data: Pic) => {
              /*pic.thumbnails = data.thumbnails;
              this.picArray = res;*/
              this.picArray.push(data);
            },
          );
        });
      },
      (err) => {
        console.log(err);
      },
    );
  }
}
