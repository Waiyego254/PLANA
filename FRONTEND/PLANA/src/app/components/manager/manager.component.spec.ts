import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagerComponent } from './manager.component';
import { SidebarService } from '../../services/sidebar.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ManagerSidebarComponent } from './manager-sidebar/manager-sidebar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ManagerComponent', () => {
  let component: ManagerComponent;
  let fixture: ComponentFixture<ManagerComponent>;
  let sidebarService: jasmine.SpyObj<SidebarService>;

  beforeEach(async () => {
    const sidebarServiceSpy = jasmine.createSpyObj('SidebarService', ['sidebarActive$']);
    sidebarServiceSpy.sidebarActive$ = of(true); // Mocking the observable

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterLink,
        RouterOutlet,
        ManagerSidebarComponent,
        ManagerComponent, RouterTestingModule, HttpClientTestingModule
      ],
      providers: [
        { provide: SidebarService, useValue: sidebarServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerComponent);
    component = fixture.componentInstance;
    sidebarService = TestBed.inject(SidebarService) as jasmine.SpyObj<SidebarService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isActive as false', () => {
    const comp = new ManagerComponent(sidebarService);
    expect(comp.isActive).toBeFalse();
  });

  it('should subscribe to sidebarActive$ and update isActive', () => {
    sidebarService.sidebarActive$ = of(true); // Simulate an active sidebar
    fixture = TestBed.createComponent(ManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isActive).toBeTrue();
  });

  it('should set isActive to false when sidebar is inactive', () => {
    sidebarService.sidebarActive$ = of(false); // Simulate an inactive sidebar
    fixture = TestBed.createComponent(ManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isActive).toBeFalse();
  });
});
