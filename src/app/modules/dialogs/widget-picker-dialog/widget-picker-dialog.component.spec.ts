import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetPickerDialogComponent } from './widget-picker-dialog.component';

describe('WidgetPickerDialogComponent', () => {
  let component: WidgetPickerDialogComponent;
  let fixture: ComponentFixture<WidgetPickerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetPickerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetPickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
