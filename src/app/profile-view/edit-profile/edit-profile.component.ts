import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.class';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ChannelsComponent } from '../../nav-bar/channels/channels.component';
import { HeaderComponent } from '../../header/header.component';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { ProfileViewComponent } from '../profile-view.component';
import { FormsModule } from '@angular/forms';
import { ChooseImageComponent } from '../choose-image/choose-image.component';
import { UserAccessComponent } from '../../user-access/user-access.component';
import { LoginComponent } from '../../user-access/login/login.component';
import { ChooseACharacterComponent } from '../../user-access/register/choose-acharacter/choose-acharacter.component';
import { UiService } from '../../services/UiService.service';
@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    AvatarComponent,
    FormsModule,
    CommonModule,
    ChooseImageComponent
  ],
  providers:[
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit{
  account!: Account;
  disabeld: boolean = true;
  saveName: string = '';
  saveEmail: string = '';
  openNewImage: boolean = false;

  constructor(
    private authService: AuthService,
    private parent: ProfileViewComponent,
    public UiService:UiService
  ) {
    this.account = this.authService.profileViewAccount;
  }

  ngOnInit(): void {
    this.UiService.openNewImageComponetObservable$.subscribe((value: boolean) => {
      this.openNewImage = value;
    });
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
        this.authService.changeEmail(this.account.email);
      }
      if (this.saveName != '') {
        this.account.name = this.saveName;
      }
      await this.authService.authUpdateUser(this.saveEmail);
      this.UiService.sortAccounts();
      this.close();
    }
  }
}
