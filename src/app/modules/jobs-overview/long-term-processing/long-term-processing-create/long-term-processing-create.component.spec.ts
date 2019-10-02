import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTermProcessingCreateComponent } from './long-term-processing-create.component';

describe('LongTermProcessingCreateComponent', () => {
  let component: LongTermProcessingCreateComponent;
  let fixture: ComponentFixture<LongTermProcessingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongTermProcessingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTermProcessingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
