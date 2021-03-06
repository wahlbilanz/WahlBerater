import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'pictureUrl',
})
export class PictureUrlPipe implements PipeTransform {
  public readonly baseUrl = environment.dataUrl;

  transform(value: string): string {
    return !!value ? `${this.baseUrl}/${value}` : '/assets/static/placeholder/unknown-person.jpg';
  }
}
