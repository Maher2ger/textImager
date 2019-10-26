import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarityWidgetComponent } from './similarity-widget.component';

describe('SimilarityWidgetComponent', () => {
  let component: SimilarityWidgetComponent;
  let fixture: ComponentFixture<SimilarityWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarityWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarityWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
