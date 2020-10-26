import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimListPageComponent } from './claim-list-page.component';

describe('ThesisListPageComponent', () => {
  let component: ClaimListPageComponent;
  let fixture: ComponentFixture<ClaimListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
