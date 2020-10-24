import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisProvPageComponent } from './thesis-prov-page.component';

describe('ThesisProvPageComponent', () => {
  let component: ThesisProvPageComponent;
  let fixture: ComponentFixture<ThesisProvPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThesisProvPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesisProvPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
