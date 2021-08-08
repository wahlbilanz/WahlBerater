import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimLinksComponent } from './claim-links.component';

describe('ClaimLinksComponent', () => {
  let component: ClaimLinksComponent;
  let fixture: ComponentFixture<ClaimLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimLinksComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
