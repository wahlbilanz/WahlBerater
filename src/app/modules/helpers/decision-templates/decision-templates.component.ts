import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-decision-templates',
  templateUrl: './decision-templates.component.html',
  styleUrls: ['./decision-templates.component.scss'],
})
export class DecisionTemplatesComponent implements OnInit {
  @ViewChild('nono', { static: true }) nonoTempleate: TemplateRef<any>;
  @ViewChild('no', { static: true }) noTempleate: TemplateRef<any>;
  @ViewChild('yes', { static: true }) yesTempleate: TemplateRef<any>;
  @ViewChild('yesyes', { static: true }) yesyesTempleate: TemplateRef<any>;
  @ViewChild('skip', { static: true }) skipTempleate: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {}
}
