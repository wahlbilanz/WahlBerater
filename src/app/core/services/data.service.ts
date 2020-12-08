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
  private readonly baseUrl = environment.dataUrl;

  constructor(private http: HttpClient) {}

  getPoliticalData(): Observable<Data> {
    return this.http.get(new URL('political.json', this.baseUrl).toString()).pipe(map((data: any) => data as Data));
  }

  getPersonalData(): Observable<any> {
    return this.http.get(new URL('personal.json', this.baseUrl).toString()).pipe(map((data: any) => data as Data));
  }
}
