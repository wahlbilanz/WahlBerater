import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Daten} from '../../definitions/models/daten.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatenServiceService {

  private readonly url = '/assets/daten.json';

  constructor(private http: HttpClient) {
  }

  getData(): Observable<Daten> {
    return this.http
      .get(this.url).pipe(
        map((data: any) => data as Daten)
      );
  }
}
