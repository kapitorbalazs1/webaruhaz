import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdomanyozasComponent } from './adomanyozas.component';

describe('AdomanyozasComponent', () => {
  let component: AdomanyozasComponent;
  let fixture: ComponentFixture<AdomanyozasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdomanyozasComponent]
    });
    fixture = TestBed.createComponent(AdomanyozasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
