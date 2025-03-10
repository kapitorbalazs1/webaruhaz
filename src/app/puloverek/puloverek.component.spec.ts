import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuloverekComponent } from './puloverek.component';

describe('PuloverekComponent', () => {
  let component: PuloverekComponent;
  let fixture: ComponentFixture<PuloverekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuloverekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuloverekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
