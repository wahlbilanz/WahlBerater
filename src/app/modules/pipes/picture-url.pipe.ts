import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'pictureUrl',
})
export class PictureUrlPipe implements PipeTransform {
  public readonly baseUrl = environment.dataUrl;

  transform(value: string, party: boolean = false): string {
    if (!!value) {
      return `${this.baseUrl}/${value}`;
    }
    if (party) {
      return '/assets/static/placeholder/unknown-persons.svg';
    }
    return '/assets/static/placeholder/unknown-person.svg';
  }
}
