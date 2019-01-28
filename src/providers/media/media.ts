import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pic } from '../../interface/pic';
import { User, LoginResponse, RegisteredResponse } from '../../interface/media';
import { NavController } from 'ionic-angular';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  mediaUrl = 'http://media.mw.metropolia.fi/wbma';
  loggedIn = false;

  constructor(
    public http: HttpClient) {

  }

  getImagesMediaAPI() {
    return this.http.get<Pic[]>(
      this.mediaUrl + '/media');
  }

  getSingleMedia(id: number) {
    return this.http.get<Pic>(
      this.mediaUrl + '/media/' + id);
  }

  register(user: User) {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
        }),
      }
    ;
    return this.http.post<RegisteredResponse>(this.mediaUrl + '/users', user,
      httpOptions);
  }

  login(user: User) {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
        }),
      }
    ;
    return this.http.post<LoginResponse>(this.mediaUrl + '/login', user,
      httpOptions);
  }
}
