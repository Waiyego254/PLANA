import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerProfileComponent } from './manager-profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ManagerProfileComponent', () => {
  let component: ManagerProfileComponent;
  let fixture: ComponentFixture<ManagerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerProfileComponent, RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
