import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NadragokComponent } from './nadragok.component';

describe('NadragokComponent', () => {
  let component: NadragokComponent;
  let fixture: ComponentFixture<NadragokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NadragokComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NadragokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
