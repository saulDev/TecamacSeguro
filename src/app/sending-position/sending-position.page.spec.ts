import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendingPositionPage } from './sending-position.page';

describe('SendingPositionPage', () => {
  let component: SendingPositionPage;
  let fixture: ComponentFixture<SendingPositionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendingPositionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendingPositionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
