import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AdminEventsComponent } from './admin-events.component';
import { EventsService } from '../../../services/events.service';
import { CommonModule } from '@angular/common';

// Mock EventsService
class EventsServiceMock {
  fetchAllEvents() {
    return of({ events: [{ event_id: '1', title: 'Event 1', isApproved: false }, { event_id: '2', title: 'Event 2', isApproved: true }] });
  }
  approveEvent(eventId: string) {
    return of({ message: 'Event approved successfully' });
  }
  deleteEvent(eventId: string) {
    return of({ message: 'Event deleted successfully' });
  }
}

describe('AdminEventsComponent', () => {
  let component: AdminEventsComponent;
  let fixture: ComponentFixture<AdminEventsComponent>;
  let eventsService: EventsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [AdminEventsComponent],
      providers: [
        { provide: EventsService, useClass: EventsServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEventsComponent);
    component = fixture.componentInstance;
    eventsService = TestBed.inject(EventsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all events on initialization', () => {
    spyOn(component, 'fetchAllEvents').and.callThrough();
    component.ngOnInit();
    expect(component.fetchAllEvents).toHaveBeenCalled();
    expect(component.events.length).toBe(2);
    expect(component.events[0].title).toBe('Event 1');
  });

  it('should approve an event', () => {
    const approveSpy = spyOn(eventsService, 'approveEvent').and.callThrough();
    const fetchSpy = spyOn(component, 'fetchAllEvents').and.callThrough();

    component.approveEvent('1');
    expect(approveSpy).toHaveBeenCalledWith('1');
    expect(fetchSpy).toHaveBeenCalled();
  });

  it('should handle error when approving an event', () => {
    spyOn(eventsService, 'approveEvent').and.returnValue(throwError('Error'));
    spyOn(console, 'error');

    component.approveEvent('1');
    expect(console.error).toHaveBeenCalledWith('Error approving event:', 'Error');
  });

  it('should delete an event', () => {
    const deleteSpy = spyOn(eventsService, 'deleteEvent').and.callThrough();
    const fetchSpy = spyOn(component, 'fetchAllEvents').and.callThrough();

    component.deleteEvent('1');
    expect(deleteSpy).toHaveBeenCalledWith('1');
    expect(fetchSpy).toHaveBeenCalled();
  });

  it('should handle error when deleting an event', () => {
    spyOn(eventsService, 'deleteEvent').and.returnValue(throwError('Error'));
    spyOn(console, 'error');

    component.deleteEvent('1');
    expect(console.error).toHaveBeenCalledWith('Error deleting event:', 'Error');
  });

  it('should render events in the table', () => {
    component.events = [
      {
        event_id: '1', title: 'Event 1', isApproved: false,
        description: '',
        date: '',
        location: '',
        ticket_type: '',
        price: 0,
        image: ''
      },
      {
        event_id: '2', title: 'Event 2', isApproved: true,
        description: '',
        date: '',
        location: '',
        ticket_type: '',
        price: 0,
        image: ''
      }
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const eventRows = compiled.querySelectorAll('tr');
    expect(eventRows.length).toBe(3); // including the header row

    const firstEventRow = eventRows[1];
    expect(firstEventRow.cells[0].textContent).toContain('Event 1');
    expect(firstEventRow.cells[1].textContent).toContain('Pending');
    expect(firstEventRow.cells[2].textContent).toContain('Approve');
    expect(firstEventRow.cells[2].textContent).toContain('Delete');
  });
});
