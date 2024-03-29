import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PersonalCandidateMap } from '../../definitions/models/candidate.model';
import { PoliticalData } from '../../definitions/models/political.data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly dateTime = new Date().toISOString().substr(0, 13);
  private readonly baseUrl = environment.dataUrl;

  constructor(private http: HttpClient) {}

  getPoliticalData(): Observable<PoliticalData> {
    return this.http.get(`${this.baseUrl}/political.json?d=${this.dateTime}`).pipe(map((data: any) => data as PoliticalData));
  }

  getPersonalData(): Observable<PersonalCandidateMap> {
    return this.http.get(`${this.baseUrl}/personal.json?d=${this.dateTime}`).pipe(map((data: any) => data as PersonalCandidateMap));
  }
}
