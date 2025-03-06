import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolokComponent } from './polok.component';

describe('PolokComponent', () => {
  let component: PolokComponent;
  let fixture: ComponentFixture<PolokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolokComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PolokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
