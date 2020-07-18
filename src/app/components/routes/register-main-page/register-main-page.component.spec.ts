import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMainPageComponent } from './register-main-page.component';

describe('RegisterMainPageComponent', () => {
  let component: RegisterMainPageComponent;
  let fixture: ComponentFixture<RegisterMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
