import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { Candidate } from '../../../../definitions/models/candidate.model';
import { Data } from '../../../../definitions/models/data.model';
import { claimScore } from '../../../../definitions/functions/score.function';

import { ApexAxisChartSeries, ApexTitleSubtitle, ApexChart, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';

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
  @Input() data: Data;
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
        /*parentHeightOffset: 0,
        offsetY: 0,*/
        /*width: 350,*/
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
    console.log(this.data);
    console.log(this.candidate);
    console.log(this.decisions);
    let maxY = 0;
    // TODO move this into effect/selector combi

    for (const category in this.data.categories) {
      const claimIds = Object.getOwnPropertyNames(this.data.claims).filter((claimId) => this.data.claims[claimId].category === category);

      if (this.data.categories.hasOwnProperty(category) && category !== 'howto') {
        let score = 0;
        if (maxY < claimIds.length) {
          maxY = claimIds.length;
        }
        for (const claim of claimIds) {
          // console.log (claim, this.decisions[claim], this.data.candidates[this.candidate]);
          if (this.decisions[claim] && this.data.candidates[this.candidate] && this.data.candidates[this.candidate].positions[claim]) {
            // console.log (claim, this.data.candidates[this.candidate].positions[claim].vote, this.decisions[claim].decision);
            score += claimScore(
              this.data.candidates[this.candidate].positions[claim].vote,
              this.decisions[claim].decision,
              this.decisions[claim].fav,
            );
          }
        }
        this.radarData.push({ category, score });
        // console.log ({category, score});
      }
    }
    console.log(this.candidate);
    console.log(this.radarData);
    console.log(maxY);
    this.chartOptions.series[0].data = this.radarData.map((s) => s.score);
    this.chartOptions.xaxis.categories = this.radarData.map((s) => s.category);
    this.chartOptions.yaxis.max = maxY * 2;
    this.chartOptions.yaxis.tickAmount = maxY * 2;
    if (this.chart) {
      this.chart.updateSeries([{ data: this.chartOptions.series[0].data }]);
    }
  }
}
