import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdHocLanguageStateComponent } from './ad-hoc-language-state.component';

describe('AdHocLanguageStateComponent', () => {
  let component: AdHocLanguageStateComponent;
  let fixture: ComponentFixture<AdHocLanguageStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdHocLanguageStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdHocLanguageStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
