import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadrantsAllPage } from './quadrants-all.page';

describe('QuadrantsAllPage', () => {
  let component: QuadrantsAllPage;
  let fixture: ComponentFixture<QuadrantsAllPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuadrantsAllPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadrantsAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
