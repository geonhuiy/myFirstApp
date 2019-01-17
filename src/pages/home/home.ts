import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Pic } from '../../interface/pic';

@Component({

  selector: 'page-home',
  templateUrl: 'home.html',

})

export class HomePage {
  picArray: Pic[] = [];
  mediaPath: string = 'assets/test.json';

  constructor(public navCtrl: NavController, private http: HttpClient) {

  }

  ngOnInit() {
    //this.getImages();
    this.getImagesMediaAPI();
  }

  getImages() {
    this.http.get<Pic[]>(this.mediaPath).subscribe(
      (res: Pic[]) => {
        this.picArray = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
    );
  }

  getImagesMediaAPI() {
    this.http.get<Pic[]>(
      'http://media.mw.metropolia.fi/wbma/media?start=10&limit=10').subscribe(
      (res: Pic[]) => {
        this.picArray = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
    );
  }
}
