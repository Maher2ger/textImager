import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTermDocumentRendererComponent } from './long-term-document-renderer.component';

describe('LongTermDocumentRendererComponent', () => {
  let component: LongTermDocumentRendererComponent;
  let fixture: ComponentFixture<LongTermDocumentRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongTermDocumentRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTermDocumentRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
