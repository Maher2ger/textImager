import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeWidgetTitleDialogComponent } from './change-widget-title-dialog.component';

describe('ChangeWidgetTitleDialogComponent', () => {
  let component: ChangeWidgetTitleDialogComponent;
  let fixture: ComponentFixture<ChangeWidgetTitleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeWidgetTitleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeWidgetTitleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
