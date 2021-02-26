import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibleAuswertungsChartComponent } from './accessible-auswertungs-chart.component';

describe('AccessibleAuswertungsChartComponent', () => {
  let component: AccessibleAuswertungsChartComponent;
  let fixture: ComponentFixture<AccessibleAuswertungsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessibleAuswertungsChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessibleAuswertungsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
