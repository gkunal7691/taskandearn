import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalNewComponent } from './professional-new.component';

describe('ProfessionalNewComponent', () => {
  let component: ProfessionalNewComponent;
  let fixture: ComponentFixture<ProfessionalNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
