import { Component, OnInit, inject } from '@angular/core';
import { AvatarComponent } from '../shared/avatar/avatar.component';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileViewComponent } from '../profile-view/profile-view.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [AvatarComponent, CommonModule, ProfileViewComponent],
})
export class HeaderComponent implements OnInit {
  authService!: AuthService;
  accountStatus!: string;
  accountName!: string;
  dropDown: boolean = false;
  profileView: boolean = false;

  constructor(private router: Router) {
    this.authService = inject(AuthService);
  }

  ngOnInit(): void {}

  switchDropDown() {
    this.dropDown = !this.dropDown;
  }

  logOut() {
    this.authService.authServiceLogOut();
    this.router.navigate(['']);
  }

  closeDropDown() {
    this.dropDown = false;
    this.profileView = false;
  }

  openProfileView() {
    this.authService.profileViewAccount = this.authService.user;
    this.profileView = true;
    this.dropDown = false;
  }
}
