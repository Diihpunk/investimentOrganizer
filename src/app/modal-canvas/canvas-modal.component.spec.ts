import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasModalComponent } from './canvas-modal.component';

describe('CanvasModalComponent', () => {
  let component: CanvasModalComponent;
  let fixture: ComponentFixture<CanvasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
