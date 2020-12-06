import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateListPageComponent } from './candidate-list-page.component';

describe('CandidateListPageComponent', () => {
  let component: CandidateListPageComponent;
  let fixture: ComponentFixture<CandidateListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateListPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
