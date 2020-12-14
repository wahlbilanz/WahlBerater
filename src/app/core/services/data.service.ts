import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
// import { Data } from '../../definitions/models/data.model';
import { PoliticalData } from '../../definitions/models/political.data.model';
import { PersonalData } from '../../definitions/models/personal.data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly baseUrl = environment.dataUrl;

  constructor(private http: HttpClient) {}

  getPoliticalData(): Observable<PoliticalData> {
    return this.http.get(`${this.baseUrl}/political.json`).pipe(map((data: any) => data as PoliticalData));
  }

  getPersonalData(): Observable<PersonalData> {
    return this.http.get(`${this.baseUrl}/personal.json`).pipe(map((data: any) => data as PersonalData));
  }
}
