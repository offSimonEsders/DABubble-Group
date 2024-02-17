import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CheckInputService } from '../../services/check-input.service';
import { AccountService } from '../../services/account.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements AfterViewInit {
  sendMailForResetPasswordFrame!: HTMLDivElement;
  loginFrame!: HTMLDivElement;
  registerFrame!: HTMLDivElement;
  loginInputFrameEmail!: HTMLDivElement;
  loginuseremailinput!: HTMLInputElement;
  loginuserpasswordinput! : HTMLInputElement;

  constructor(public authService: AuthService, private checkInputService: CheckInputService,private accounts:AccountService,private Chat:ChatService) {
    
  }

  ngAfterViewInit(): void {
    this.sendMailForResetPasswordFrame = <HTMLDivElement>document.querySelector('.send-mail-for-reset-password-frame');
    this.loginFrame = <HTMLDivElement>document.querySelector('.login-frame');
    this.registerFrame = <HTMLDivElement>document.querySelector('.register-frame');
    this.loginInputFrameEmail = <HTMLDivElement>document.querySelector('.login-input-frame-email');
    this.loginuseremailinput = <HTMLInputElement>document.getElementById('login_user_email_input');
    this.loginuserpasswordinput = <HTMLInputElement>document.getElementById('login_user_password_input');
  }

  openSendMailToResetPassword() {
    this.sendMailForResetPasswordFrame.style.display = 'flex';
    this.loginFrame.style.display = 'none';
  }

  showRegistration() {
    this.loginFrame.style.display = 'none';
    this.registerFrame.style.display = 'flex';
  }

  async callLoginWithEmailAndPassword() {
    let emailInput = this.loginuseremailinput.value;
    let passwordInput = this.loginuserpasswordinput.value;
    this.Chat.AllUserInChannel();
    if (this.checkInputService.isValidUseremail(emailInput) && passwordInput.length > 0) {
      await this.authService.authServiceSignInWithEmailAndPassword(emailInput, passwordInput, this.loginFailed);
      return;
    }
    this.loginFailed();
  }

  loginFailed() {
    let loginInputFrame = <HTMLDivElement>document.querySelector('.login-input-frame-email');
    loginInputFrame.classList.add('login-failed');
  }

  removeLoginFailed() {
    this.loginInputFrameEmail.classList.remove('login-failed');
  }

  showPasswort(){
    this.loginuserpasswordinput.type = (this.loginuserpasswordinput.type === "text") ? "password" : "text";
  }

}
