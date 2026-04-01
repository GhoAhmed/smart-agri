import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FarmerDashboardComponent } from './components/farmer/farmer-dashboard/farmer-dashboard.component';
import { ValvesComponent } from './components/farmer/valves/valves.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './components/admin/users/users.component';
import { adminGuard, farmerGuard, publicGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    canActivate: [publicGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [publicGuard],
    component: RegisterComponent,
  },
  {
    path: 'farmer',
    canActivate: [farmerGuard],
    component: FarmerDashboardComponent,
    children: [
      { path: '', redirectTo: 'valves', pathMatch: 'full' },
      {
        path: 'valves',
        component: ValvesComponent,
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        component: UsersComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
