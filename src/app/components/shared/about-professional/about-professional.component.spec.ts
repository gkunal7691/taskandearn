import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutProfessionalComponent } from './about-professional.component';

describe('AboutProfessionalComponent', () => {
  let component: AboutProfessionalComponent;
  let fixture: ComponentFixture<AboutProfessionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutProfessionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
