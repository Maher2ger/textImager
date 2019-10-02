import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMapWidgetComponent } from './location-map-widget.component';

describe('LocationMapWidgetComponent', () => {
  let component: LocationMapWidgetComponent;
  let fixture: ComponentFixture<LocationMapWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationMapWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationMapWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
