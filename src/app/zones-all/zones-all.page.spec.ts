import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesAllPage } from './zones-all.page';

describe('ZonesAllPage', () => {
  let component: ZonesAllPage;
  let fixture: ComponentFixture<ZonesAllPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonesAllPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonesAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
