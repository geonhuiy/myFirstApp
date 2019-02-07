import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pic } from '../../interface/pic';
import { LoginResponse, RegisteredResponse, User } from '../../interface/media';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  mediaUrl = 'http://media.mw.metropolia.fi/wbma';
  loggedIn = false;

  constructor(public http: HttpClient) {
  }

  getImagesMediaAPI() {
    return this.http.get<Pic[]>(this.mediaUrl + '/media');
  }

  getSingleMedia(id: number) {
    return this.http.get<Pic>(this.mediaUrl + '/media/' + id);
  }

  register(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this.http.post<RegisteredResponse>(
      this.mediaUrl + '/users',
      user,
      httpOptions,
    );
  }

  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this.http.post<LoginResponse>(
      this.mediaUrl + '/login',
      user,
      httpOptions,
    );
  }

  getUserProfile() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'x-access-token',
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.get<User>(this.mediaUrl + '/users/user', httpOptions);
  }

  getAllProfilePictures() {
    return this.http.get(this.mediaUrl + '/tags/profile');
  }

  uploadMedia(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.post<any>(this.mediaUrl + '/media', data, httpOptions);
  }

  uploadTag(tag: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.post<any>(this.mediaUrl + '/tags', tag, httpOptions);
  }
}
