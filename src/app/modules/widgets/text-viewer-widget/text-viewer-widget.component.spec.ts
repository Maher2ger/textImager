import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextViewerWidgetComponent } from './text-viewer-widget.component';

describe('TextViewerWidgetComponent', () => {
  let component: TextViewerWidgetComponent;
  let fixture: ComponentFixture<TextViewerWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextViewerWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextViewerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
