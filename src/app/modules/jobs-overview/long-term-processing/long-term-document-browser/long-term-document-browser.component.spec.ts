import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTermDocumentBrowserComponent } from './long-term-document-browser.component';

describe('LongTermDocumentBrowserComponent', () => {
  let component: LongTermDocumentBrowserComponent;
  let fixture: ComponentFixture<LongTermDocumentBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongTermDocumentBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTermDocumentBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
