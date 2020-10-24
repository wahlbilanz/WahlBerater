import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisListPageComponent } from './thesis-list-page.component';

describe('ThesisListPageComponent', () => {
  let component: ThesisListPageComponent;
  let fixture: ComponentFixture<ThesisListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThesisListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesisListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
