import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesWidgetComponent } from './entities-widget.component';

describe('EntitiesWidgetComponent', () => {
  let component: EntitiesWidgetComponent;
  let fixture: ComponentFixture<EntitiesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitiesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
