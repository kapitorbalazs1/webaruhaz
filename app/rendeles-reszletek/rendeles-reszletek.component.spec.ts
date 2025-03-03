import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendelesReszletekComponent } from './rendeles-reszletek.component';

describe('RendelesReszletekComponent', () => {
  let component: RendelesReszletekComponent;
  let fixture: ComponentFixture<RendelesReszletekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RendelesReszletekComponent]
    });
    fixture = TestBed.createComponent(RendelesReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
