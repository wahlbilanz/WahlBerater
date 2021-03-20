import { Component, OnInit } from '@angular/core';

interface FaqEntry {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
  faq: FaqEntry[] = [];

  constructor() {
    this.faq.push({
      question: 'Was soll ich fragen?',
      answer: 'Vielleicht fragst du das am besten jemand anderes...',
    });
  }

  ngOnInit(): void {}
}
