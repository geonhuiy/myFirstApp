import { Component } from '@angular/core';
import { Pic } from '../../interface/pic';
import { MediaProvider } from '../../providers/media/media';
import { Observable} from 'rxjs';

@Component({

  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  picArray: Observable<Pic[]>;

  constructor(
    private mediaProvider: MediaProvider) {

  }

  ngOnInit() {
    this.getAllFiles();}

  getAllFiles = () => {
    this.picArray = this.mediaProvider.getImagesMediaAPI();
  }
}
