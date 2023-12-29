import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CheckInputService } from '../../services/check-input.service';

@Component({
  selector: 'app-send-mail-for-reset-password',
  standalone: true,
  imports: [],
  templateUrl: './send-mail-for-reset-password.component.html',
  styleUrl: './send-mail-for-reset-password.component.scss'
})
export class SendMailForResetPasswordComponent implements AfterViewInit {
  @ViewChild('sendmailsubmitbutton') sendmailsubmitbutton: any;
  @ViewChild('sendmailinput') sendmailinput: any;
  @ViewChild('sendmailuserfeedback') sendmailuserfeedback: any;
  sendmailforresetpasswordframe!: HTMLDivElement;
  loginFrame!: HTMLDivElement;

  constructor(private authservice: AuthService, private checkinputservice: CheckInputService) {

  }

  ngAfterViewInit(): void {
    this.sendmailforresetpasswordframe = <HTMLDivElement>document.querySelector('.send-mail-for-reset-password-frame');
    this.loginFrame = <HTMLDivElement>document.querySelector('.login-frame');
  }

  CheckUseremail() {
    if (this.checkinputservice.isValidUseremail(this.sendmailinput.nativeElement.value)) {
      this.sendmailsubmitbutton.nativeElement.disabled = false;
    } else {
      this.sendmailsubmitbutton.nativeElement.disabled = true;
    }
  }

  backToLogin() {
    this.sendmailforresetpasswordframe.style.display = 'none';
    this.loginFrame.style.display = 'flex';
  }

  async sendMailToResetPassword(event: Event) {
    event.preventDefault();
    if( await this.authservice.resetPassword(this.sendmailinput.nativeElement.value)) {
      this.sendmailuserfeedback.nativeElement.style.display = 'flex';
    }
    this.sendmailsubmitbutton.nativeElement.disabled = true;
    this.sendmailinput.nativeElement.value = ''
    setTimeout(() => {
      this.backToLogin();
      this.sendmailuserfeedback.nativeElement.style.display = 'none';
    }, 2000);
  }

}
