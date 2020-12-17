import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuswertungCategoryPanelComponent } from './auswertung-category-panel.component';

describe('AuswertungCategoryPanelComponent', () => {
  let component: AuswertungCategoryPanelComponent;
  let fixture: ComponentFixture<AuswertungCategoryPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuswertungCategoryPanelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuswertungCategoryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
