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

  contributers: string[] = [];

  constructor() {
    this.contributers = [
      '<a href="https://www.linkedin.com/in/sophie-flack-36826121b">Sophie Flack</a> studiert im Master Demokratiewissenschaften an der Universität in Regensburg.',
      'Tom Theile arbeitet am <a href="https://www.demogr.mpg.de/">Max-Planck-Institut für demographische Forschung</a> als Softwareentwickler.',
      '<a href="https://binfalse.de">Martin Scharm</a> ist <a href="https://codeahoi.de/">freiberuflicher IT-Ingenieur</a> und Teil eines <a href="https://naval-architect.de/">Schiffbau-Start-Ups.</a>',
    ].sort(() => 0.5 - Math.random());
  }

  ngOnInit(): void {}
}
