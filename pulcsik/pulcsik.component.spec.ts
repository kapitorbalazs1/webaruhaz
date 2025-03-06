import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulcsikComponent } from './pulcsik.component';

describe('PulcsikComponent', () => {
  let component: PulcsikComponent;
  let fixture: ComponentFixture<PulcsikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PulcsikComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PulcsikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
