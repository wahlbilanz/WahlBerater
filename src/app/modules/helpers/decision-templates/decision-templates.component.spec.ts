import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionTemplatesComponent } from './decision-templates.component';

describe('DecisionTemplatesComponent', () => {
  let component: DecisionTemplatesComponent;
  let fixture: ComponentFixture<DecisionTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecisionTemplatesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
