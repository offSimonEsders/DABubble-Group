import { Component } from '@angular/core';
import { AvatarComponent } from '../shared/avatar/avatar.component';
import { AuthService } from '../services/auth.service';
import { Account } from '../models/account.class';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [AvatarComponent,CommonModule],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})
export class ProfileViewComponent {
  account!:Account;

  constructor(private authService:AuthService){
    this.account = this.authService.profileViewAccount;
  }
}
