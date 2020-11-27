import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuswertungBarchartTableComponent } from './auswertung-barchart-table.component';

describe('AuswertungBarchartTableComponent', () => {
  let component: AuswertungBarchartTableComponent;
  let fixture: ComponentFixture<AuswertungBarchartTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuswertungBarchartTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuswertungBarchartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
