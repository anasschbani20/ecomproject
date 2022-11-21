import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToplayoutComponent } from './toplayout.component';

describe('ToplayoutComponent', () => {
  let component: ToplayoutComponent;
  let fixture: ComponentFixture<ToplayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToplayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToplayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
