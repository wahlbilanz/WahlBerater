import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imprint-page',
  templateUrl: './imprint-page.component.html',
  styleUrls: ['./imprint-page.component.scss'],
})
export class ImprintPageComponent implements OnInit {
  mail: string;

  constructor() {
    this.mail = 'wahlberatung';
    this.mail += '@codeahoi.de';
  }

  ngOnInit(): void {}
}
