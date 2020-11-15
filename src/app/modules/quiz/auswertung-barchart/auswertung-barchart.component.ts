import {Component, Input, ViewChild, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppPartialState} from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ChartComponent, ApexPlotOptions, ApexDataLabels
} from 'ng-apexcharts';
import {CandidateMap} from '../../../definitions/models/candidate.model';
import {claimScore} from '../../../definitions/functions/score.function';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-auswertung-barchart',
  templateUrl: './auswertung-barchart.component.html',
  styleUrls: ['./auswertung-barchart.component.scss']
})
export class AuswertungBarchartComponent implements OnInit {

  votes = this.store.pipe(select(AppSelectors.getVotes));
  data = this.store.pipe(select(AppSelectors.getData));

  decisions = {};
  candidates = {};

  @ViewChild('chartObj', {static: false}) chart: ChartComponent;

  public chartOptions: Partial<ChartOptions>;


  constructor(private store: Store<AppPartialState>) {

    this.chartOptions = {
      series: [{
        data: []
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
        categories: [],
      }
    };
  }


  recalc(): void {
    if (this.candidates && this.decisions) {
      const scoreArray = [];
      for (const c in this.candidates) {
        if (this.candidates.hasOwnProperty(c)) {
          let score = 0;
          for (const v in this.candidates[c].positions) {
            if (this.candidates[c].positions.hasOwnProperty(v)) {
              if (this.decisions[v]) {
                score += claimScore(this.candidates[c].positions[v].vote, this.decisions[v].decision, this.decisions[v].fav);
              }
            }
          }
          scoreArray.push({
            candidate: c,
            score
          });
        }
      }
      this.chartOptions.series[0].data = scoreArray.map(s => s.score);
      this.chartOptions.xaxis.categories = scoreArray.map(s => s.candidate);
      if (this.chart) {
        this.chart.updateSeries([{data: this.chartOptions.series[0].data}]);
      }
    }
  }

  ngOnInit(): void {
    this.data.subscribe(d => {
      this.candidates = d.candidates;
      this.recalc();
    });
    this.votes.subscribe(v => {
      this.decisions = v;
      this.recalc();
    });
  }

}
