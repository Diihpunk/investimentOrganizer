import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPremiumComponent } from './modal-premium.component';

describe('ModalPremiumComponent', () => {
  let component: ModalPremiumComponent;
  let fixture: ComponentFixture<ModalPremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPremiumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
