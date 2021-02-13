import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-decision-icon',
  templateUrl: './decision-icon.component.html',
  styleUrls: ['./decision-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecisionIconComponent {
  @Input() vote: number = null;
}
