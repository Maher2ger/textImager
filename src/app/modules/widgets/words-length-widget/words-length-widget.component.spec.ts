import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsLengthWidgetComponent } from './words-length-widget.component';

describe('WordsLengthWidgetComponent', () => {
  let component: WordsLengthWidgetComponent;
  let fixture: ComponentFixture<WordsLengthWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsLengthWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsLengthWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
