import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedTasksComponent } from './applied-tasks.component';

describe('AppliedTasksComponent', () => {
  let component: AppliedTasksComponent;
  let fixture: ComponentFixture<AppliedTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliedTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
