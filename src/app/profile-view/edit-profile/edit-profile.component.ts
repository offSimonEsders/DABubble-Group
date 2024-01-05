import { Component } from '@angular/core';
import { Account } from '../../models/account.class';
import { AuthService } from '../../services/auth.service';
import { ChannelsComponent } from '../../nav-bar/channels/channels.component';
import { HeaderComponent } from '../../header/header.component';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  account!:Account;
  
  constructor(private authService:AuthService,private channels:ChannelsComponent, private head:HeaderComponent){
    this.account = this.authService.profileViewAccount;
  }
}
