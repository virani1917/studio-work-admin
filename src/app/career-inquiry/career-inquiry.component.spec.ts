import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerInquiryComponent } from './career-inquiry.component';

describe('CareerInquiryComponent', () => {
  let component: CareerInquiryComponent;
  let fixture: ComponentFixture<CareerInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
