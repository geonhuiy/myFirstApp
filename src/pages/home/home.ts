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
    this.getImages();
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
}
