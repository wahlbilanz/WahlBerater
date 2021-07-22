import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionButtonComponent } from './decision-button.component';

describe('DecisionButtonComponent', () => {
  let component: DecisionButtonComponent;
  let fixture: ComponentFixture<DecisionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecisionButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
