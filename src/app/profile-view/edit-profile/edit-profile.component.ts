import { Component } from '@angular/core';
import { Account } from '../../models/account.class';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ChannelsComponent } from '../../nav-bar/channels/channels.component';
import { HeaderComponent } from '../../header/header.component';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { ProfileViewComponent } from '../profile-view.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [AvatarComponent, FormsModule, CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  account!: Account;
  disabeld: boolean = true;
  saveName: string = '';
  saveEmail: string = '';

  constructor(
    private authService: AuthService,
    private channels: ChannelsComponent,
    private head: HeaderComponent,
    private parent: ProfileViewComponent
  ) {
    this.account = this.authService.profileViewAccount;
  }

  close() {
    this.saveEmail = '';
    this.saveName = '';
    this.parent.switchEdit();
  }

  checkall() {
    if (
      this.saveName.length > 2 ||
      (this.saveName.length == 0 && this.checkEmail())
    ) {
      this.disabeld = false;
    } else {
      this.disabeld = true;
    }
  }

  checkEmail() {
    return (
      (this.saveEmail.length > 2 && this.saveEmail.includes('@')) ||
      (this.saveEmail.length == 0 && this.saveEmail.includes('@'))
    );
  }

  async save() {
    if (this.saveEmail || this.saveName != '') {
      if (this.saveEmail != '') {
        this.account.email = this.saveEmail;
      }
      if (this.saveName != '') {
        this.account.name = this.saveName;
      }
      await this.authService.authUpdateUser(this.saveEmail);
      this.channels.sortAccounts();
      this.close();
    }
  }
}
