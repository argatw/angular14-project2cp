import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarparkDetailComponent } from './carpark-detail.component';

describe('CarparkDetailComponent', () => {
  let component: CarparkDetailComponent;
  let fixture: ComponentFixture<CarparkDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarparkDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarparkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
