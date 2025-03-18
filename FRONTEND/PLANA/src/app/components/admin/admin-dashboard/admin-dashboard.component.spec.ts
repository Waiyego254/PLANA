import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock AdminDashboardService
class AdminDashboardServiceMock {
  getUserCount() {
    return of({ numberOfUsers: 10 });
  }
  getEventCount() {
    return of({ numberOfEvents: 5 });
  }
  getTotalRevenue() {
    return of({ totalRevenue: 1000 });
  }
}

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let adminDashboardService: AdminDashboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ChartModule, HttpClientTestingModule, AdminDashboardComponent],
      declarations: [],
      providers: [
        { provide: AdminDashboardService, useClass: AdminDashboardServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    adminDashboardService = TestBed.inject(AdminDashboardService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load analytics data on initialization', () => {
    spyOn(component, 'loadAnalytics').and.callThrough();

    component.ngOnInit();

    expect(component.loadAnalytics).toHaveBeenCalled();
    expect(component.numberOfUsers).toBe(10);
    expect(component.numberOfEvents).toBe(5);
    expect(component.totalRevenue).toBe(1000);
  });

  it('should update user chart data correctly', () => {
    component.numberOfUsers = 15;
    component.updateUserChart();
    expect(component.userChartData.datasets[0].data[0]).toBe(15);
  });

  it('should update event chart data correctly', () => {
    component.numberOfEvents = 8;
    component.updateEventChart();
    expect(component.eventChartData.datasets[0].data[0]).toBe(8);
  });

  it('should update revenue chart data correctly', () => {
    component.totalRevenue = 2000;
    component.updateRevenueChart();
    expect(component.revenueChartData.datasets[0].data[0]).toBe(2000);
  });

  it('should handle error when fetching user count', () => {
    spyOn(adminDashboardService, 'getUserCount').and.returnValue(throwError('Error'));
    spyOn(console, 'error');

    component.loadAnalytics();

    expect(console.error).toHaveBeenCalledWith('Error fetching user count:', 'Error');
  });

  it('should handle error when fetching event count', () => {
    spyOn(adminDashboardService, 'getEventCount').and.returnValue(throwError('Error'));
    spyOn(console, 'error');

    component.loadAnalytics();

    expect(console.error).toHaveBeenCalledWith('Error fetching event count:', 'Error');
  });

  it('should handle error when fetching total revenue', () => {
    spyOn(adminDashboardService, 'getTotalRevenue').and.returnValue(throwError('Error'));
    spyOn(console, 'error');

    component.loadAnalytics();

    expect(console.error).toHaveBeenCalledWith('Error fetching total revenue:', 'Error');
  });
});
