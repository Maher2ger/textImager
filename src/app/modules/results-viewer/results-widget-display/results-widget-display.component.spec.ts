import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResultsWidgetDisplayComponent} from './results-widget-display.component';

describe('ResultsWidgetDisplayComponent', () => {
  let component: ResultsWidgetDisplayComponent;
  let fixture: ComponentFixture<ResultsWidgetDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsWidgetDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsWidgetDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
