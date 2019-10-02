import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieGridChartWidgetComponent } from './pie-grid-chart-widget.component';

describe('PieGridChartWidgetComponent', () => {
  let component: PieGridChartWidgetComponent;
  let fixture: ComponentFixture<PieGridChartWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieGridChartWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieGridChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
