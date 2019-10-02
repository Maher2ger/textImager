import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobNlpConfigDialogComponent } from './job-nlp-config-dialog.component';

describe('JobNlpConfigDialogComponent', () => {
  let component: JobNlpConfigDialogComponent;
  let fixture: ComponentFixture<JobNlpConfigDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobNlpConfigDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobNlpConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
