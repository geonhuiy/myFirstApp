import { Component } from '@angular/core';
import { Pic } from '../../interface/pic';
import { MediaProvider } from '../../providers/media/media';
import { NavController } from 'ionic-angular';

@Component({

  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  picArray: Pic[] = [];

  constructor(
    private mediaProvider: MediaProvider, private navCtrl: NavController) {
  }

  ngOnInit() {
    this.getAllFiles();}

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
