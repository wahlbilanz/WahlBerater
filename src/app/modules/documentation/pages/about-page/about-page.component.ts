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
    this.faq = [
      {
        question: 'Was soll ich fragen?',
        answer: 'Vielleicht fragst du das am besten jemand anderes...',
      },
      {
        question: 'Wie kommt ihr auf den Namen?',
        answer: 'Wir haben locker 100+ Vorschläge diskutiert. Am Ende gab es natürlich eine demokratische Entscheidung! :)',
      },
      {
        question: 'Wer seid ihr?',
        answer: '',
      },
      {
        question: 'Welcher Liste gehoert ihr an?',
        answer: 'Wir sind parteilos und haben einfach nur spass an Politik. Wir moechten die Demokratie staerken.',
      },
      {
        question: 'Wo habt ihr die Thesen her?',
        answer: '',
      },
      {
        question: 'Wie habt ihr die Thesen ausgewaehlt?',
        answer: '',
      },
      {
        question: 'wie kommt die reihenfolge der listen/candidaten etc in den verschiedenen ansichten zustande?',
        answer: '',
      },
      {
        question: 'welche Daten sammelt ihr?',
        answer: '',
      },
      {
        question: 'wer sieht wie ich mich zu einer These entschieden habe?',
        answer: '',
      },
      {
        question: 'mit wem teilt ihr meine Daten?',
        answer: '',
      },
      {
        question: 'kann ich den Code zur App bekommen?',
        answer: '',
      },
      {
        question: 'wie kann ich meine Daten löschen?',
        answer: '',
      },
      {
        question: 'Wo kann ich mich registrieren?',
        answer: '',
      },
      {
        question: 'Kann ich auch einen WahlBerater bekommen?',
        answer: '',
      },
      {
        question: 'wie berechnet ihr die auswertung?',
        answer: '',
      },
      {
        question: 'Wer finanziert euch?',
        answer:
          'Nachdem der AStA der FernUniverstität sich für eine Wahlentscheidungshilfe entschied, hat er die Entwicklung einer solchen ausgeschrieben. ' +
          'Als Entwickler von [DeinWal.de](https://deinwal.de) wurden wir im Mai 2020 darüber in Kenntnis gesetzt, ' +
          'waren sofort interessiert, haben ein Konzept und Angebot eingereicht und konnten uns offensichtlich bei der Begutachtung durchsetzen.  ' +
          '\n\n\n\n' +
          'Seitdem entwickeln wir das Tool als Dienstleister für den AStA.' +
          'Unsere Berührungspunkte mit dem AStA beschränken sich jedoch lediglich auf organisatorische Angelegenheiten &mdash; inhaltlich waren wir vollkommen unabhängig.' +
          'Der AStA war nicht in die Thesengenerierung und -auswahl einbezogen und hat die Thesen auch erst am Tag der Veröffentlichung gesehen.',
      },
    ];
  }

  ngOnInit(): void {}
}
