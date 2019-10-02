import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdHocFileRendererComponent } from './ad-hoc-file-renderer.component';

describe('AdHocFileRendererComponent', () => {
  let component: AdHocFileRendererComponent;
  let fixture: ComponentFixture<AdHocFileRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdHocFileRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdHocFileRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
