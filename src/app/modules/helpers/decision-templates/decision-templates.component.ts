import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AGREEMENT } from '../../../definitions/enums/agreement.enum';

@Component({
  selector: 'app-decision-templates',
  templateUrl: './decision-templates.component.html',
  styleUrls: ['./decision-templates.component.scss'],
})
export class DecisionTemplatesComponent implements OnInit {
  agreement = AGREEMENT;

  @ViewChild('no', { static: true }) noTempleate: TemplateRef<any>;
  @ViewChild('noAgree', { static: true }) noAgreeTempleate: TemplateRef<any>;
  @ViewChild('noAgreeAndFav', { static: true }) noAgreeAndFavTempleate: TemplateRef<any>;
  @ViewChild('noDisagree', { static: true }) noDisagreeTempleate: TemplateRef<any>;

  @ViewChild('yes', { static: true }) yesTempleate: TemplateRef<any>;
  @ViewChild('yesAgree', { static: true }) yesAgreeTempleate: TemplateRef<any>;
  @ViewChild('yesAgreeAndFav', { static: true }) yesAgreeAndFavTempleate: TemplateRef<any>;
  @ViewChild('yesDisagree', { static: true }) yesDisagreeTempleate: TemplateRef<any>;

  @ViewChild('skip', { static: true }) skipTempleate: TemplateRef<any>;
  // @ViewChild('star', { static: true }) starTempleate: TemplateRef<any>;
  // @ViewChild('noDisagree', { static: true }) noDisagreeTempleate: TemplateRef<any>;
  // @ViewChild('yesDisagree', { static: true }) yesDisagreeTempleate: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {}
}
