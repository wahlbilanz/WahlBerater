import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuswertungHeatmapComponent } from './auswertung-heatmap.component';

describe('AuswertungHeatmapComponent', () => {
  let component: AuswertungHeatmapComponent;
  let fixture: ComponentFixture<AuswertungHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuswertungHeatmapComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuswertungHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
