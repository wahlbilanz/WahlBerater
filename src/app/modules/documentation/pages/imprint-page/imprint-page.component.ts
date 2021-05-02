import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imprint-page',
  templateUrl: './imprint-page.component.html',
  styleUrls: ['./imprint-page.component.scss'],
})
export class ImprintPageComponent implements OnInit {
  domain = 'codeahoi';
  mto = 'mailto:';

  constructor() {}

  ngOnInit(): void {}
}
