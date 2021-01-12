import { Component, Input, OnInit } from '@angular/core';
import { LinkMap } from '../../../../definitions/models/link.model';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss'],
})
export class SocialLinksComponent implements OnInit {
  @Input() public links: LinkMap;
  @Input() public name: string;

  constructor() {}

  ngOnInit(): void {}
}
