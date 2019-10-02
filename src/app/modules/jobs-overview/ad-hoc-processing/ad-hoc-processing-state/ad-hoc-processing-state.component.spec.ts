import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdHocProcessingStateComponent } from './ad-hoc-processing-state.component';

describe('AdHocProcessingStateComponent', () => {
  let component: AdHocProcessingStateComponent;
  let fixture: ComponentFixture<AdHocProcessingStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdHocProcessingStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdHocProcessingStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
