import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Pic } from '../../interface/pic';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail',
})
export class ThumbnailPipe implements PipeTransform {
  constructor (private mediaProvider: MediaProvider) {

  }
  transform(id: number, ...args) {
    return new Promise((resolve, reject) => {
      this.mediaProvider.getSingleMedia(id).subscribe((res: Pic) => {
        switch (args[0]) {
          case 'large':
            resolve(res.thumbnails.w640);
            break;
          case 'medium':
            resolve(res.thumbnails.w320);
          case 'small':
            resolve(res.thumbnails.w160);
        }
      })
    })
  }
}
