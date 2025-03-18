import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserBookingsComponent } from './components/user-bookings/user-bookings.component';
import { ManagerSidebarComponent } from './components/manager/manager-sidebar/manager-sidebar.component';
import { ManagerDashboardComponent } from './components/manager/manager-dashboard/manager-dashboard.component';
import { ManagerEventsComponent } from './components/manager/manager-events/manager-events.component';
import { ManagerUsersComponent } from './components/manager/manager-users/manager-users.component';
import { ManagerBookingsComponent } from './components/manager/manager-bookings/manager-bookings.component';
import { ManagerProfileComponent } from './components/manager/manager-profile/manager-profile.component';
import { ManagerComponent } from './components/manager/manager.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminEventsComponent } from './components/admin/admin-events/admin-events.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'', component: LandingComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard]},
    {path: 'user-bookings', component: UserBookingsComponent, canActivate: [AuthGuard]},

    {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
    {
        path: 'manager', component: ManagerComponent,
        children: [
            {path: 'manager-home', component: ManagerDashboardComponent, canActivate: [AuthGuard]},
            {path: 'manager-events', component: ManagerEventsComponent, canActivate: [AuthGuard]},
            {path: 'manager-users', component: ManagerUsersComponent, canActivate: [AuthGuard]},
            {path: 'manager-bookings', component: ManagerBookingsComponent, canActivate: [AuthGuard]},
            {path: 'manager-profile', component: ManagerProfileComponent, canActivate: [AuthGuard]}
        ]
        
    },

    {
        path: 'admin', component: AdminComponent,
        children: [
            {path: 'admin-home', component: AdminDashboardComponent, canActivate: [AuthGuard]},
            {path: 'admin-events', component: AdminEventsComponent, canActivate: [AuthGuard]},
            {path: 'admin-users', component: AdminUsersComponent, canActivate: [AuthGuard]},
            {path: 'admin-profile', component: AdminProfileComponent, canActivate: [AuthGuard]}
        ]
    }
];
