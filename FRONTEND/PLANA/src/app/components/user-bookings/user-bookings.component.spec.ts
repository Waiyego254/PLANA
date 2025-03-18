import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserBookingsComponent } from './user-bookings.component';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { BookingDetails } from '../interfaces/bookingdetails';
import { events } from '../interfaces/events';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserBookingsComponent', () => {
  let component: UserBookingsComponent;
  let fixture: ComponentFixture<UserBookingsComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['fetchBookingsByUser', 'fetchEventDetails', 'cancelBooking']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, UserBookingsComponent, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserBookingsComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    // Mock localStorage
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return key === 'userId' ? '123' : null;
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load bookings on init', () => {
    const mockBookings: BookingDetails[] = [{
      booking_id: '1', event_id: 'e1', user_id: '123', booking_date: new Date('2024-01-01'),
      ticket_type: ''
    }];
    const mockEvent: events = {
      event_id: 'e1', title: 'Mock Event', date: '2024-01-01', description: 'Mock Description', location: 'Mock Location', ticket_type: 'General', price: 100,
      image: '',
      isApproved: false
    };

    authService.fetchBookingsByUser.and.returnValue(of({ bookingsByUser: mockBookings }));
    authService.fetchEventDetails.and.returnValue(of(mockEvent));

    component.ngOnInit();

    expect(authService.fetchBookingsByUser).toHaveBeenCalledWith('123');
    expect(authService.fetchEventDetails).toHaveBeenCalledWith('e1');
    expect(component.bookings.length).toBe(1);
    expect(component.events.length).toBe(1);
  });

  it('should handle error when fetching bookings', () => {
    authService.fetchBookingsByUser.and.returnValue(throwError(() => new Error('Error fetching bookings')));

    component.loadBookings();

    expect(authService.fetchBookingsByUser).toHaveBeenCalledWith('123');
    expect(component.bookings.length).toBe(0);
  });

  it('should handle error when fetching event details', () => {
    const mockBookings: BookingDetails[] = [{
      booking_id: '1', event_id: 'e1', user_id: '123', booking_date: new Date('2024-01-01'),
      ticket_type: ''
    }];

    authService.fetchBookingsByUser.and.returnValue(of({ bookingsByUser: mockBookings }));
    authService.fetchEventDetails.and.returnValue(throwError(() => new Error('Error fetching event details')));

    component.loadBookings();

    expect(authService.fetchBookingsByUser).toHaveBeenCalledWith('123');
    expect(authService.fetchEventDetails).toHaveBeenCalledWith('e1');
    expect(component.events.length).toBe(0);
  });

  it('should cancel booking and reload bookings', () => {
    authService.cancelBooking.and.returnValue(of({ message: 'Booking cancelled' }));
    spyOn(component, 'loadBookings').and.callThrough();

    component.cancelBooking('1');

    expect(authService.cancelBooking).toHaveBeenCalledWith('1');
    expect(component.loadBookings).toHaveBeenCalled();
  });

  it('should handle error when canceling booking', () => {
    authService.cancelBooking.and.returnValue(throwError(() => new Error('Error canceling booking')));

    component.cancelBooking('1');

    expect(authService.cancelBooking).toHaveBeenCalledWith('1');
  });

  it('should return correct event title', () => {
    const mockEvent: events = {
      event_id: 'e1', title: 'Mock Event', date: '2024-01-01', description: 'Mock Description', location: 'Mock Location', ticket_type: 'General', price: 100,
      image: '',
      isApproved: false
    };
    component.events.push(mockEvent);

    const title = component.getEventTitle('e1');
    expect(title).toBe('Mock Event');
  });

  it('should return "Unknown Event" for unknown event id', () => {
    const title = component.getEventTitle('unknown');
    expect(title).toBe('Unknown Event');
  });
});
