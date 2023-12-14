import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserAccessComponent } from './user-access/user-access.component';

export const routes: Routes = [
  { path: '', component: UserAccessComponent },
  { path: 'home', component: HomeComponent },
];
