import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuswertungBarchartComponent } from './auswertung-barchart.component';

describe('AuswertungBarchartComponent', () => {
  let component: AuswertungBarchartComponent;
  let fixture: ComponentFixture<AuswertungBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuswertungBarchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuswertungBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
