import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTaskComponent } from './post-task.component';

describe('TasksComponent', () => {
  let component: PostTaskComponent;
  let fixture: ComponentFixture<PostTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostTaskComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
