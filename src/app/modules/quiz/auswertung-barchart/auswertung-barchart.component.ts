import { Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ChartComponent,
  ApexPlotOptions,
  ApexDataLabels,
} from 'ng-apexcharts';
import { PersonalCandidateMap, PoliticalCandidateMap } from '../../../definitions/models/candidate.model';
import { claimScore } from '../../../definitions/functions/score.function';
import { getCandidatePersonalInfo } from '../../../definitions/functions/getCandidatePersonalInfo';
import { Score } from '../../../definitions/models/score.model';

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
  styleUrls: ['./auswertung-barchart.component.scss'],
})
/**
 * @deprecated since version 2.0
 */
export class AuswertungBarchartComponent implements OnInit, OnChanges {
  @Input() votes;
  @Input() politicalCandidates: PoliticalCandidateMap;
  @Input() personalCandidates: PersonalCandidateMap;

  decisions = {};
  candidates = {};

  @ViewChild('chartObj', { static: false }) chart: ChartComponent;

  public chartOptions: Partial<ChartOptions>;

  constructor(private store: Store<AppPartialState>) {
    this.chartOptions = {
      series: [
        {
          data: [],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
      },
    };
    console.warn('using the apex charts component is deprecated!');
  }

  recalc(): void {
    if (this.politicalCandidates && this.votes) {
      const scoreArray = [];
      for (const c in this.politicalCandidates) {
        if (this.politicalCandidates.hasOwnProperty(c)) {
          const score = new Score();
          for (const v in this.politicalCandidates[c].positions) {
            if (this.politicalCandidates[c].positions.hasOwnProperty(v)) {
              if (this.votes[v]) {
                score.add(claimScore(this.politicalCandidates[c].positions[v].vote, this.votes[v].decision, this.votes[v].fav));
              }
            }
          }
          scoreArray.push({
            candidate: getCandidatePersonalInfo(this.personalCandidates, c).name,
            score,
          });
        }
      }
      this.chartOptions.series[0].data = scoreArray.map((s) => s.score);
      this.chartOptions.xaxis.categories = scoreArray.map((s) => s.candidate);
      if (
        this.chart &&
        this.chartOptions.series &&
        this.chartOptions.series[0].data &&
        scoreArray.length === Object.keys(this.politicalCandidates).length
      ) {
        this.chart.updateOptions(this.chartOptions);
        this.chart.updateSeries([{ data: this.chartOptions.series[0].data }]);
      }
    }
  }

  ngOnInit(): void {
    this.recalc();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.recalc();
  }
}
