import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateListCardComponent } from './candidate-list-card.component';

describe('CandidateListCardComponent', () => {
  let component: CandidateListCardComponent;
  let fixture: ComponentFixture<CandidateListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
