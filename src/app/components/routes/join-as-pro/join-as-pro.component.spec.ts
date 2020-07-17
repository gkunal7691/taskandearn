import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinAsProComponent } from './join-as-pro.component';

describe('JoinAsProComponent', () => {
  let component: JoinAsProComponent;
  let fixture: ComponentFixture<JoinAsProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinAsProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinAsProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
