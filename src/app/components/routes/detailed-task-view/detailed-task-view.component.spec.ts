import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedTaskViewComponent } from './detailed-task-view.component';

describe('DetailedTaskViewComponent', () => {
  let component: DetailedTaskViewComponent;
  let fixture: ComponentFixture<DetailedTaskViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedTaskViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
