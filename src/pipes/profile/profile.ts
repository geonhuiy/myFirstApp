import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { User } from '../../interface/media';
import { rejects } from 'assert';
/**
 * Generated class for the ProfilePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'profile',
})
export class ProfilePipe implements PipeTransform {
  constructor(private mediaProvider: MediaProvider) {

  }

  async transform(id: number, ...args) {
    return new Promise((resolve, reject) => {

    });
  }
}
