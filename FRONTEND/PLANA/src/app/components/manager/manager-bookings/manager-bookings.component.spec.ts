import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBookingsComponent } from './manager-bookings.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ManagerBookingsComponent', () => {
  let component: ManagerBookingsComponent;
  let fixture: ComponentFixture<ManagerBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerBookingsComponent, RouterTestingModule, HttpClientTestingModule,]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
