import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { claimScore } from '../../../../definitions/functions/score.function';

import { ApexAxisChartSeries, ApexTitleSubtitle, ApexChart, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { PoliticalData } from '../../../../definitions/models/political.data.model';
import { PersonalCandidateMap } from '../../../../definitions/models/candidate.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
};

@Component({
  selector: 'app-candidate-list-card',
  templateUrl: './candidate-list-card.component.html',
  styleUrls: ['./candidate-list-card.component.scss'],
})
export class CandidateListCardComponent implements OnInit {
  @Input() candidate: string;
  @Input() politicalData: PoliticalData;
  @Input() personalData: PersonalCandidateMap;
  @Input() decisions;

  radarData = [];

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Series 1',
          data: [],
        },
      ],
      chart: {
        height: 250,
        type: 'radar',
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        min: 0,
        max: 0,
        tickAmount: 0,
      },
    };
  }

  ngOnInit(): void {
    let maxY = 0;
    // TODO move this into effect/selector combi

    for (const category in this.politicalData.categories) {
      const claimIds = Object.getOwnPropertyNames(this.politicalData.claims).filter(
        (claimId) => this.politicalData.claims[claimId].category === category,
      );

      if (this.politicalData.categories.hasOwnProperty(category) && category !== 'howto') {
        let score = 0;
        if (maxY < claimIds.length) {
          maxY = claimIds.length;
        }
        for (const claim of claimIds) {
          if (
            this.decisions[claim] &&
            this.politicalData.candidates[this.candidate] &&
            this.politicalData.candidates[this.candidate].positions[claim]
          ) {
            score += claimScore(
              this.politicalData.candidates[this.candidate].positions[claim].vote,
              this.decisions[claim].decision,
              this.decisions[claim].fav,
            );
          }
        }
        this.radarData.push({ category, score });
      }
    }
    this.chartOptions.series[0].data = this.radarData.map((s) => s.score);
    this.chartOptions.xaxis.categories = this.radarData.map((s) => s.category);
    this.chartOptions.yaxis.max = maxY * 2;
    this.chartOptions.yaxis.tickAmount = maxY * 2;
    if (this.chart) {
      this.chart.updateSeries([{ data: this.chartOptions.series[0].data }]);
    }
  }
}
