import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyDetailPageComponent } from './party-detail-page.component';

describe('PartyDetailPageComponent', () => {
  let component: PartyDetailPageComponent;
  let fixture: ComponentFixture<PartyDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
