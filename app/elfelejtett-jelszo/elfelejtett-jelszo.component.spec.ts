import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElfelejtettJelszoComponent } from './elfelejtett-jelszo.component';

describe('ElfelejtettJelszoComponent', () => {
  let component: ElfelejtettJelszoComponent;
  let fixture: ComponentFixture<ElfelejtettJelszoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElfelejtettJelszoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElfelejtettJelszoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
