import { Component } from '@angular/core';
import { Account } from '../../models/account.class';
import { AuthService } from '../../services/auth.service';
import { ChannelsComponent } from '../../nav-bar/channels/channels.component';
import { HeaderComponent } from '../../header/header.component';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { ProfileViewComponent } from '../profile-view.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [AvatarComponent,FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  account!:Account;
  disabeld:boolean = true;
  saveName:string = '';
  saveEmail:string = '';
  
  constructor(private authService:AuthService,private channels:ChannelsComponent, private head:HeaderComponent,private parent:ProfileViewComponent){
    this.account = this.authService.profileViewAccount;
  }

  close(){
    this.saveEmail = '';
    this.saveName = '';
    this.parent.switchEdit();
  }

  checkName(){
    if(this.saveName.length > 2){
      this.checkEmailChange()
    }
  }

  checkEmailChange(){
    if(this.saveEmail.length != 0 && this.saveEmail.includes('@')){
      this.disabeld = false;
    }
  }

  checkEmail(){
    if(this.saveEmail.length > 2 && this.saveEmail.includes('@')){
      this.checkNameChange()
    }
  }

  checkNameChange(){
    if(this.saveName.length > 2){
      this.disabeld = false
    }
  }

  save(){
    if(this.saveEmail || this.saveName != ''){
      this.account.email = this.saveEmail;
      this.account.name = this.saveName;
      this.authService.authUpdateUser(this.account);
    }
  }
}
