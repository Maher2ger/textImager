import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdHocFilesCompleteCheckComponent } from './ad-hoc-files-complete-check.component';

describe('AdHocFilesCompleteCheckComponent', () => {
  let component: AdHocFilesCompleteCheckComponent;
  let fixture: ComponentFixture<AdHocFilesCompleteCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdHocFilesCompleteCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdHocFilesCompleteCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
