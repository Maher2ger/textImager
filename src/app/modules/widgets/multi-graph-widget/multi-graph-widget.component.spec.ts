import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiGraphWidgetComponent } from './multi-graph-widget.component';

describe('MultiGraphWidgetComponent', () => {
  let component: MultiGraphWidgetComponent;
  let fixture: ComponentFixture<MultiGraphWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiGraphWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiGraphWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
