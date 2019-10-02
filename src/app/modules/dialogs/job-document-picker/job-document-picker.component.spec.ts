import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDocumentPickerComponent } from './job-document-picker.component';

describe('JobDocumentPickerComponent', () => {
  let component: JobDocumentPickerComponent;
  let fixture: ComponentFixture<JobDocumentPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDocumentPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDocumentPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
