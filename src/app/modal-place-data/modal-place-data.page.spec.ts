import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlaceDataPage } from './modal-place-data.page';

describe('ModalPlaceDataPage', () => {
  let component: ModalPlaceDataPage;
  let fixture: ComponentFixture<ModalPlaceDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPlaceDataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPlaceDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
