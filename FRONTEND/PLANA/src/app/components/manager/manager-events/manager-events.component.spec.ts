import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEventsComponent } from './manager-events.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ManagerEventsComponent', () => {
  let component: ManagerEventsComponent;
  let fixture: ComponentFixture<ManagerEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerEventsComponent, RouterTestingModule, HttpClientTestingModule,]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
