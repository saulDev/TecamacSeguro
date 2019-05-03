import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitRoutePage } from './visit-route.page';

describe('VisitRoutePage', () => {
  let component: VisitRoutePage;
  let fixture: ComponentFixture<VisitRoutePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitRoutePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitRoutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
