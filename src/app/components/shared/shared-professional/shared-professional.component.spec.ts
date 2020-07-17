import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedProfessionalComponent } from './shared-professional.component';

describe('SharedProfessionalComponent', () => {
  let component: SharedProfessionalComponent;
  let fixture: ComponentFixture<SharedProfessionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedProfessionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
