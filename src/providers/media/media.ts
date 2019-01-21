import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pic } from '../../interface/pic';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  mediaUrl = 'http://media.mw.metropolia.fi/wbma';

  constructor(public http: HttpClient) {

  }

  getImagesMediaAPI() {
    return this.http.get<Pic[]>(
      this.mediaUrl + '/media');
  }
  
}
