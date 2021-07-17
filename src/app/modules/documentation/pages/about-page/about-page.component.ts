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
        question: 'Wie kommt ihr auf den Namen?',
        answer:
          'Wir haben locker 100+ Vorschläge diskutiert. Am Ende gab es natürlich eine demokratische Entscheidung! Und WahlBerater ist doch eigentlich ganz passend, oder? :)',
      },
      {
        question: 'Wer seid ihr?',
        answer:
          'Sophie Flack ist eine Politikwissenschaftlerin, die sich nicht nur auf Parteienforschung spezialisiert hat, ' +
          'sondern auch eine außergewöhnlich internationale Perspektive mitbringt: Sie hat beispielsweise in Deutschland, ' +
          'den Niederlanden, und Spanien studiert und zuletzt im chilenischen Generalkonsulat gearbeitet.<br>' +
          'Martin Peters hat als DevOps Engineer und Software Entwickler ein beeindruckendes Gespür für Webanwendungen. ' +
          'Er arbeitet hauptberuflich für ein Unternehmen in der Martimen Logistik und Tracking Industrie. ' +
          'Sein Fokus liegt auf der Entwicklung moderner Webanwendungen, Optimierung der Entwicklunsabläufe und Anaylse von Stromdaten.<br>' +
          'Martin Scharm ist einer der DeinWal-Gründer und hat mal was mit Bioinformatik und Systembiologie gelernt. Er arbeitet seit 10+ Jahren als Systemingenieur und ' +
          'sucht freiberuflich nach spannenden IT-Projekten und Herausforderungen.<br>' +
          'Wir haben alle Spaß an interdisziplinärer Arbeit. Insbesondere Politik sollte für jeden einfach zugänglich sein!',
      },
      {
        question: 'Welcher Liste gehört ihr an?',
        answer:
          'Wir gehören keiner Liste an und kennen die Kandidierenden auch nicht. Wir studieren nichtmal an der FernUniversität. ' +
          'Wir sind parteilos und haben einfach nur Spaß an Politik, Demokratie und coolen Projekten.',
      },
      {
        question: 'Wo habt ihr die Thesen her?',
        answer:
          'Die Thesen kommen im Wesentlichen von euch! Wir haben mittels Limesurvey Thesenvorschläge gesammelt und ' +
          'für die Einreichung Werbung in der Zeitschrift der Studierendenschaft der FernUniversität in Hagen (Sprachrohre 04/20, 02/21, 03/21) ' +
          'und in den sozialen Medien gemacht. #TODO',
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
        question: 'Wie berechnet ihr die auswertung?',
        answer: '',
      },
      {
        question: 'Welche Daten sammelt ihr auf der Webseite?',
        answer: '',
      },
      {
        question: 'Wer sieht wie ich mich zu einer These entschieden habe?',
        answer: '',
      },
      {
        question: 'Wer hat alles Zugriff auf meine Daten?',
        answer: '',
      },
      {
        question: 'Wie kann ich meine Daten löschen?',
        answer: '',
      },
      {
        question: 'Kann ich den Code zur App bekommen?',
        answer: '',
      },
      {
        question: 'Wo kann ich mich registrieren?',
        answer:
          'Ähm, wofür willst du dich nochmal registrieren? ' +
          'Hier gibt es keine Accounts. Wenn du für das StuPA kandidieren möchtest wende dich am besten an den <a href="https://www.fernstudis.de/index.php?menuid=4">AStA</a> (für diese Wahl kommst du aber ein bisschen zu spät).',
      },
      {
        question: 'Kann ich auch einen WahlBerater bekommen?',
        answer:
          'Klar! Der WahlBerater ist Quelloffen und steht unter einer freien Lizenz zur Verfügung! Du kannst ihn benutzen wie und wofür du möchtest.  ' +
          '\n\n' +
          'Die Entwicklung einer Wahlentscheidungshilfe ist jedoch wesentlich aufwändiger als es im ersten Moment scheint! ' +
          'Die Entwicklung einer Software ist da eher Nebensache. ' +
          'Wir helfen dir aber gern als unabhängiges Team. ' +
          '[Schreib uns](/docs/imprint) einfach eine E-Mail wofür du den WahlBerater brauchst und wir finden dann sicher auch eine Lösung für dich!',
      },
    ];
  }

  ngOnInit(): void {}
}
