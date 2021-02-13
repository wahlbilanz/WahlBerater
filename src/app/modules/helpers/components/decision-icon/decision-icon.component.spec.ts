import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionIconComponent } from './decision-icon.component';

describe('DecisionIconComponent', () => {
  let component: DecisionIconComponent;
  let fixture: ComponentFixture<DecisionIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecisionIconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
