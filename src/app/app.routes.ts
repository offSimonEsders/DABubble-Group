import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserAccessComponent } from './user-access/user-access.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ResetPasswordComponent } from './user-access/reset-password/reset-password.component';
import { DsgvoComponent } from './dsgvo/dsgvo.component';
import { ImprintComponent } from './imprint/imprint.component';

export const routes: Routes = [
  { path: '', component: UserAccessComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'DSGVO', component:DsgvoComponent },
  { path: 'IMPRINT', component: ImprintComponent },
  { path: '**', redirectTo: '' }, 
];
