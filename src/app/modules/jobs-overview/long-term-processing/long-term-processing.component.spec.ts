import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTermProcessingComponent } from './long-term-processing.component';

describe('LongTermProcessingComponent', () => {
  let component: LongTermProcessingComponent;
  let fixture: ComponentFixture<LongTermProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongTermProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTermProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
