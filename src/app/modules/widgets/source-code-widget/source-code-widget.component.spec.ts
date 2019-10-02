import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceCodeWidgetComponent } from './source-code-widget.component';

describe('SourceCodeWidgetComponent', () => {
  let component: SourceCodeWidgetComponent;
  let fixture: ComponentFixture<SourceCodeWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceCodeWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceCodeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
