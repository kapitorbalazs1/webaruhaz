import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisztracioComponent } from './regisztracio.component';

describe('RegisztracioComponent', () => {
  let component: RegisztracioComponent;
  let fixture: ComponentFixture<RegisztracioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisztracioComponent]
    });
    fixture = TestBed.createComponent(RegisztracioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
