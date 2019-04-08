import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadrantsPage } from './quadrants.page';

describe('QuadrantsPage', () => {
  let component: QuadrantsPage;
  let fixture: ComponentFixture<QuadrantsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuadrantsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadrantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
