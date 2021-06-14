import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeEarnerLoginComponent } from './become-earner-login.component';

describe('BecomeEarnerLoginComponent', () => {
  let component: BecomeEarnerLoginComponent;
  let fixture: ComponentFixture<BecomeEarnerLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeEarnerLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeEarnerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
