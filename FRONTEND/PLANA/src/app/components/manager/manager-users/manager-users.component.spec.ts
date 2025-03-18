import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerUsersComponent } from './manager-users.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ManagerUsersComponent', () => {
  let component: ManagerUsersComponent;
  let fixture: ComponentFixture<ManagerUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerUsersComponent, RouterTestingModule, HttpClientTestingModule,]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
