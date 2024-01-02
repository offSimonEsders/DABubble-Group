import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserAccessComponent } from './user-access/user-access.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ResetPasswordComponent } from './user-access/reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', component: UserAccessComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not Found!' },
  },
  { path: '**', redirectTo: '/not-found' }, // ** Wildcard-Route: Abfangen aller nicht bekannten Pfade *muss als letzes im Array erscheinen
];
