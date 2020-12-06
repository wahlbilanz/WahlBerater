import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuswertungHeatmapVotesComponent } from './auswertung-heatmap-votes.component';

describe('AuswertungHeatmapVotesComponent', () => {
  let component: AuswertungHeatmapVotesComponent;
  let fixture: ComponentFixture<AuswertungHeatmapVotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuswertungHeatmapVotesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuswertungHeatmapVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
