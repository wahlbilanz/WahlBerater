import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimProvPageComponent } from './claim-prov-page.component';

describe('ThesisProvPageComponent', () => {
  let component: ClaimProvPageComponent;
  let fixture: ComponentFixture<ClaimProvPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimProvPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimProvPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
