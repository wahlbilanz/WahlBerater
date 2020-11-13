import {Component, Input, ViewChild, OnInit} from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ChartComponent
} from 'ng-apexcharts';
import {CandidateMap} from '../../../definitions/models/candidate.model';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
};


@Component({
  selector: 'app-auswertung-barchart',
  templateUrl: './auswertung-barchart.component.html',
  styleUrls: ['./auswertung-barchart.component.scss']
})
export class AuswertungBarchartComponent implements OnInit {

  @Input() votes: {};
  @Input() candidates: CandidateMap;

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: any;


  constructor() {

  }

  private calcScore(candidate: number, user: number, fav: boolean): number {
    if (candidate === 0 || user === 0 || (candidate > 0 && user < 0) || (candidate < 0 && user > 0)) {
      return 1;
    }

    if (candidate === 2) {
      if (user === 1 && fav) {
        return 2;
      }
      if (user === 1) {
        return 1;
      }
    }

    if (candidate === 1) {
      if (user === 1 || user === 0) {
        return 1;
      }
    }

    if (candidate === -1) {
      if (user === -1 || user === 0) {
        return 1;
      }
    }

    if (candidate === -2) {
      if (user === -1 && fav) {
        return 2;
      }
      if (user === -1) {
        return 1;
      }
    }

    return 0;
  }

  ngOnInit(): void {
    const scoreArray = [];
    // console.log (this.votes);
    for (const c in this.candidates) {
      if (this.candidates.hasOwnProperty(c)) {
        let score = 0;
        for (const v in this.candidates[c].positions) {
          if (this.candidates[c].positions.hasOwnProperty(v)) {
            // console.log (v);
            // console.log (this.candidates[c].positions[v]);
            // console.log (this.votes[v]);
            if (this.votes[v]) {
              score += this.calcScore (this.candidates[c].positions[v].vote, this.votes[v].decision, this.votes[v].fav)
            }
          }

        }
        scoreArray.push ({
          candidate: c,
          score
        });
      }
    }
this.chartOptions = {
          series: [{
          data: scoreArray.map(s => s.score)
        }],
          chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: scoreArray.map(s => s.candidate),
        }
        };
    /*this.chartOptions = {
      series: [
        {
          name: 'Series 1',
          data: [80, 50, 30, 40, 100, 20]
        }
      ],
      chart: {
        height: 350,
        type: 'radar'
      },
      title: {
        text: 'Basic Radar Chart'
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June']
      }
    };*/
  }

}
