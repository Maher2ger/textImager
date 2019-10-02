import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdHocFilesEditorComponent } from './ad-hoc-files-editor.component';

describe('AdHocFilesEditorComponent', () => {
  let component: AdHocFilesEditorComponent;
  let fixture: ComponentFixture<AdHocFilesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdHocFilesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdHocFilesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
