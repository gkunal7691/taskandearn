import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedTasksComponent } from './requested-tasks.component';

describe('RequestedTasksComponent', () => {
  let component: RequestedTasksComponent;
  let fixture: ComponentFixture<RequestedTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestedTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
