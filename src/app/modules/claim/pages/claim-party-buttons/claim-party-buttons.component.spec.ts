import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimPartyButtonsComponent } from './claim-party-buttons.component';

describe('ClaimPartyButtonsComponent', () => {
  let component: ClaimPartyButtonsComponent;
  let fixture: ComponentFixture<ClaimPartyButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimPartyButtonsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimPartyButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
