import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KabatokComponent } from './kabatok.component';

describe('KabatokComponent', () => {
  let component: KabatokComponent;
  let fixture: ComponentFixture<KabatokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KabatokComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KabatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
