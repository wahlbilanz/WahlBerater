import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDetailPageComponent } from './candidate-detail-page.component';

describe('CandidateDetailPageComponent', () => {
  let component: CandidateDetailPageComponent;
  let fixture: ComponentFixture<CandidateDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateDetailPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
