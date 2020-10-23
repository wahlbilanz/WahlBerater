import { Component, OnInit } from '@angular/core';
import {DatenServiceService} from '../../services/daten-service.service';
import {Observable} from 'rxjs';
import {Daten} from '../../../definitions/models/daten.model';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  daten: Daten;

  constructor(readonly ds: DatenServiceService) { }

  ngOnInit(): void {
    this.ds.getData ().subscribe(daten => {this.daten = daten;console.log (this.daten)});
  }

}
