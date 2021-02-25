import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibleQuizComponent } from './accessible-quiz.component';

describe('AccessibleQuizComponent', () => {
  let component: AccessibleQuizComponent;
  let fixture: ComponentFixture<AccessibleQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessibleQuizComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessibleQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
