import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFrequencyWidgetComponent } from './character-frequency-widget.component';

describe('CharacterFrequencyWidgetComponent', () => {
  let component: CharacterFrequencyWidgetComponent;
  let fixture: ComponentFixture<CharacterFrequencyWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterFrequencyWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterFrequencyWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
