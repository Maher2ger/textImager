import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdHocProcessingComponent } from './ad-hoc-processing.component';

describe('AdHocProcessingComponent', () => {
  let component: AdHocProcessingComponent;
  let fixture: ComponentFixture<AdHocProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdHocProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdHocProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
