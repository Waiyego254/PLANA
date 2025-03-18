import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { EventsService } from '../../../services/events.service';
import { events } from '../../interfaces/events';

@Component({
  selector: 'app-manager-events',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manager-events.component.html',
  styleUrls: ['./manager-events.component.css']
})
export class ManagerEventsComponent implements OnInit {
  events: events[] = [];
  selectedEvent: events | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  selectedFile: File | null = null;
  imageError: string = '';
  eventForm: FormGroup = new FormGroup({});
  imageurl: string = '';

  constructor(private eventService: EventsService) {}

  ngOnInit(): void {
    this.fetchAllEvents();
  }

  fetchAllEvents(): void {
    this.eventService.fetchAllEvents().subscribe(
      (response) => {
        this.events = response.events;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch events';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }

  formatDateToYyyyMmDd(date: string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  onCreate(eventForm: NgForm): void {
    if (eventForm.valid) {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('upload_preset', 'plana_system');
        formData.append('cloud_name', 'dzg24szct');
        
        fetch('https://api.cloudinary.com/v1_1/dzg24szct/image/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {
            const event: events = { ...eventForm.value, image: result.url };
            this.eventService.createEvent(event).subscribe(
              (response) => {
                this.successMessage = response.message;
                this.fetchAllEvents();
                eventForm.reset();
                this.selectedFile = null;
                this.closeModal()
                setTimeout(() => {
                  this.successMessage = '';
                }, 3000);
              },
              (error) => {
                this.errorMessage = 'Failed to create event';
                setTimeout(() => {
                  this.errorMessage = '';
                }, 3000);
              }
            );
          })
          .catch((error) => {
            console.error('Error:', error);
            this.errorMessage = 'Failed to upload image';
            setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
          });
      } else {
        this.errorMessage = 'Please select an image';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    }
  }

  getImagesUrl(event: any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'plana_system');
      formData.append('cloud_name', 'dzg24szct');
      this.imageurl = '';

      fetch('https://api.cloudinary.com/v1_1/dzg24szct/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          this.imageurl = result.url;
          this.eventForm.patchValue({ image: this.imageurl });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  onUpdate(eventForm: NgForm): void {
    if (eventForm.valid && this.selectedEvent) {
      const updateEvent = (imageUrl: string) => {
        const event: events = { ...this.selectedEvent, ...eventForm.value, image: imageUrl || this.selectedEvent?.image };
        this.eventService.updateEvent(this.selectedEvent?.event_id!, event).subscribe(
          (response) => {
            this.successMessage = response.message;
            this.fetchAllEvents();
            this.selectedEvent = null;
            eventForm.reset();
            this.selectedFile = null;
            this.closeModal()
            setTimeout(() => {
              this.successMessage = '';
            }, 3000);
          },
          (error) => {
            this.errorMessage = 'Failed to update event';
            setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
          }
        );
      };
  
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('upload_preset', 'plana_system');
        formData.append('cloud_name', 'dzg24szct');
  
        fetch('https://api.cloudinary.com/v1_1/dzg24szct/image/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {
            updateEvent(result.url);
          })
          .catch((error) => {
            console.error('Error:', error);
            this.errorMessage = 'Failed to upload image';
            setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
          });
      } else {
        updateEvent(this.selectedEvent.image);
      }
    }
  }

  onDelete(event_id: string): void {
    this.eventService.deleteEvent(event_id).subscribe(
      (response) => {
        this.successMessage = 'Event deleted successfully';
        this.fetchAllEvents();
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      (error) => {
        this.errorMessage = 'Failed to delete event';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && file.size > 5000000) { // 5 MB size limit
      this.imageError = 'File size should be less than 5 MB';
      this.selectedFile = null;
    } else {
      this.imageError = '';
      this.selectedFile = file;
    }
  }

  openCreateModal(): void {
    this.selectedEvent = null;
    this.selectedFile = null;
    this.openModal();
  }

  openUpdateModal(event: events): void {
    this.selectedEvent = event;
    this.selectedFile = null;
    this.openModal();
  }

  openModal(): void {
    const modal = document.getElementById('create-event-modal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(): void {
    const modal = document.getElementById('create-event-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onCancel(): void {
    this.closeModal();
  }
}
