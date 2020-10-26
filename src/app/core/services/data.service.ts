import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Data } from '../../definitions/models/data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly url = environment.dataUrl;

  constructor(private http: HttpClient) {}

  getData(): Observable<Data> {
    return this.http.get(this.url).pipe(map((data: any) => data as Data));
  }
}
