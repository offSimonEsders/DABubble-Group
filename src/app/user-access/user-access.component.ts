import { Component } from '@angular/core';
import { StartAnimationComponent } from "./start-animation/start-animation.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { SendMailForResetPasswordComponent } from "./send-mail-for-reset-password/send-mail-for-reset-password.component";
import { Router } from '@angular/router';
import { ChooseACharacterComponent } from './register/choose-acharacter/choose-acharacter.component';
import { EditProfileComponent } from '../profile-view/edit-profile/edit-profile.component';
import { ChannelsComponent } from '../nav-bar/channels/channels.component';
import { HeaderComponent } from '../header/header.component';


@Component({
    selector: 'app-user-access',
    standalone: true,
    templateUrl: './user-access.component.html',
    styleUrl: './user-access.component.scss',
    imports: [StartAnimationComponent, LoginComponent, RegisterComponent, SendMailForResetPasswordComponent, HeaderComponent],
    providers: [ChooseACharacterComponent, EditProfileComponent, ChannelsComponent, HeaderComponent]
})
export class UserAccessComponent {

  constructor(public router: Router) {

  }

  
}
