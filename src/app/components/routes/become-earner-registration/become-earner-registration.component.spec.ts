import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeEarnerRegistrationComponent } from './become-earner-registration.component';

describe('BecomeEarnerRegistrationComponent', () => {
  let component: BecomeEarnerRegistrationComponent;
  let fixture: ComponentFixture<BecomeEarnerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeEarnerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeEarnerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
