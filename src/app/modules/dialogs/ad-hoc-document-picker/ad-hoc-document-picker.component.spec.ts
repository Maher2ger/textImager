import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdHocDocumentPickerComponent } from './ad-hoc-document-picker.component';

describe('AdHocDocumentPickerComponent', () => {
  let component: AdHocDocumentPickerComponent;
  let fixture: ComponentFixture<AdHocDocumentPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdHocDocumentPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdHocDocumentPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
