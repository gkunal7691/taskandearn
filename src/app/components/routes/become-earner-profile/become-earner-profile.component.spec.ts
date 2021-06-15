import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeEarnerProfileComponent } from './become-earner-profile.component';

describe('BecomeEarnerProfileComponent', () => {
  let component: BecomeEarnerProfileComponent;
  let fixture: ComponentFixture<BecomeEarnerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeEarnerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeEarnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
