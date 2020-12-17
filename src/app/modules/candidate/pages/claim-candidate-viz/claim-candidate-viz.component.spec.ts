import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimCandidateVizComponent } from './claim-candidate-viz.component';

describe('ClaimCandidateVizComponent', () => {
  let component: ClaimCandidateVizComponent;
  let fixture: ComponentFixture<ClaimCandidateVizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimCandidateVizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimCandidateVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
