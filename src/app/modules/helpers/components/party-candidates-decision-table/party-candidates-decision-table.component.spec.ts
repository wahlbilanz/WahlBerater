import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyCandidatesDecisionTableComponent } from './party-candidates-decision-table.component';

describe('PartyCandidatesDecisionTableComponent', () => {
  let component: PartyCandidatesDecisionTableComponent;
  let fixture: ComponentFixture<PartyCandidatesDecisionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartyCandidatesDecisionTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyCandidatesDecisionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
