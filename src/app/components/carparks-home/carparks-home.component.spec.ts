import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarparksHomeComponent } from './carparks-home.component';

describe('CarparksHomeComponent', () => {
  let component: CarparksHomeComponent;
  let fixture: ComponentFixture<CarparksHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarparksHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarparksHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
