import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleGraphWidgetComponent } from './simple-graph-widget.component';

describe('SimpleGraphWidgetComponent', () => {
  let component: SimpleGraphWidgetComponent;
  let fixture: ComponentFixture<SimpleGraphWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleGraphWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleGraphWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
