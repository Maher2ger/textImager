import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCloudWidgetComponent } from './word-cloud-widget.component';

describe('WordCloudWidgetComponent', () => {
  let component: WordCloudWidgetComponent;
  let fixture: ComponentFixture<WordCloudWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordCloudWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCloudWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
