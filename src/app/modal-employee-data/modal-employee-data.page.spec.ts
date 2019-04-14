import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmployeeDataPage } from './modal-employee-data.page';

describe('ModalEmployeeDataPage', () => {
  let component: ModalEmployeeDataPage;
  let fixture: ComponentFixture<ModalEmployeeDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEmployeeDataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmployeeDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
