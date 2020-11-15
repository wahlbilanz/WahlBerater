import {Component, ViewChild, Input, OnInit} from '@angular/core';
import {Candidate} from '../../../../definitions/models/candidate.model';
import {Data} from '../../../../definitions/models/data.model';
import {claimScore} from '../../../../definitions/functions/score.function';


import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ChartComponent
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-candidate-list-card',
  templateUrl: './candidate-list-card.component.html',
  styleUrls: ['./candidate-list-card.component.scss']
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
          data: []
        }
      ],
      chart: {
        height: 350,
        width: 350,
        type: 'radar'
      },
      xaxis: {
        categories: []
      }
    };
  }

  ngOnInit(): void {
    console.log (this.data);
    console.log (this.candidate);
    console.log (this.decisions);

    for (const category in this.data.categories) {
      if (this.data.categories.hasOwnProperty(category)) {
        let score = 0;
        for (const claim of this.data.categories[category].claims) {
          console.log (claim, this.decisions[claim], this.data.candidates[this.candidate]);
          if (this.decisions[claim] && this.data.candidates[this.candidate] && this.data.candidates[this.candidate].positions[claim]) {
            console.log (claim, this.data.candidates[this.candidate].positions[claim].vote, this.decisions[claim].decision);
            score += claimScore(this.data.candidates[this.candidate].positions[claim].vote, this.decisions[claim].decision, this.decisions[claim].fav);
          }
        }
        this.radarData.push({category, score});
        console.log ({category, score});
      }
    }
    this.chartOptions.series[0].data = this.radarData.map(s => s.score);
    this.chartOptions.xaxis.categories = this.radarData.map(s => s.category);
    if (this.chart) {
      this.chart.updateSeries([{data: this.chartOptions.series[0].data}]);
    }

  }

}
