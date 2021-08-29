import { Component, OnInit } from '@angular/core';
import { AGREEMENT } from '../../../../definitions/enums/agreement.enum';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
  agreement = AGREEMENT;
  domain = 'deinwal';
  mto = 'mailto:';

  constructor() {}

  ngOnInit(): void {}
}
