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
        question: 'Welcher Liste gehört ihr an?',
        answer:
          'Wir gehören keiner Liste an und kennen die Kandidierenden auch nicht. ' +
          'Wir sind parteilos und haben einfach nur Spaß an Politik und Demokratie.',
      },
      {
        question: 'Wo habt ihr die Thesen her?',
        answer: '',
      },
      {
        question: 'Wie habt ihr die Thesen ausgewählt?',
        answer: '',
      },
      {
        question: 'Wie kommt die Reihenfolge der Listen/Kandidierenden in den verschiedenen Ansichten zustande?',
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
      {
        question: 'wie berechnet ihr die auswertung?',
        answer: '',
      },
      {
        question: 'Welche Daten sammelt ihr?',
        answer: '',
      },
      {
        question: 'Wer sieht wie ich mich zu einer These entschieden habe?',
        answer: '',
      },
      {
        question: 'mit wem teilt ihr meine Daten?',
        answer: '',
      },
      {
        question: 'wie kann ich meine Daten löschen?',
        answer: '',
      },
      {
        question: 'kann ich den Code zur App bekommen?',
        answer: '',
      },
      {
        question: 'Wo kann ich mich registrieren?',
        answer:
          'Ähm, wofür willst du dich nochmal registrieren? ' +
          'Hier gibt es keine Accounts und zum Kandidieren kommst du ein bisschen zu spät.',
      },
      {
        question: 'Kann ich auch einen WahlBerater bekommen?',
        answer:
          'Klar! Der WahlBerater ist Quelloffen und steht unter einer *freien* Lizenz zur Verfügung! Du kannst ihn wirklich benutzen wie und wofür du möchtest!  ' +
          '\n\n' +
          'Die Entwicklung einer Wahlentscheidungshilfe ist jedoch wesentlich aufwändiger als es im ersten Moment scheint! ' +
          'Wir helfen dir aber gern als unabhängiges Team. ' +
          'Schreib uns einfach eine E-Mail wofür du den WahlBerater brauchst und wir finden dann sicher auch eine Lösung für dich :)',
      },
    ];
  }

  ngOnInit(): void {}
}
