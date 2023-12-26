import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {
  sendmailforresetpasswordframe!: HTMLDivElement;
  loginFrame!: HTMLDivElement;

  constructor(public authservice: AuthService) {
    
  }
  ngAfterViewInit(): void {
    this.sendmailforresetpasswordframe = <HTMLDivElement>document.querySelector('.send-mail-for-reset-password-frame');
    this.loginFrame = <HTMLDivElement>document.querySelector('.login-frame');
  }

  openSendMailToResetPassword() {
    this.sendmailforresetpasswordframe.style.display = 'flex';
    this.loginFrame.style.display = 'none';
  }

}
