import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngekComponent } from './ingek.component';

describe('IngekComponent', () => {
  let component: IngekComponent;
  let fixture: ComponentFixture<IngekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
