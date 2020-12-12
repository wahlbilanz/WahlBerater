import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyListPageComponent } from './party-list-page.component';

describe('PartyListPageComponent', () => {
  let component: PartyListPageComponent;
  let fixture: ComponentFixture<PartyListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
