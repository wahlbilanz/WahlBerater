import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuswertungComponent } from './auswertung.component';

describe('AuswertungComponent', () => {
  let component: AuswertungComponent;
  let fixture: ComponentFixture<AuswertungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuswertungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuswertungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
