import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HireProComponent } from './hire-pro.component';

describe('HireProComponent', () => {
  let component: HireProComponent;
  let fixture: ComponentFixture<HireProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HireProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HireProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
