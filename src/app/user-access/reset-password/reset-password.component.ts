import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CheckInputService } from '../../services/check-input.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [NgIf],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('password1') password1?: ElementRef;
  @ViewChild('password2') password2?: ElementRef;
  @ViewChild('changepasswordbutton') changepasswordbutton?: ElementRef;

  linkused!: boolean;
  loaded: boolean = false;

  constructor(private router: Router, private authservice: AuthService, private route: ActivatedRoute, private checkinputservice: CheckInputService, private ngzone: NgZone) {

  }
  async ngOnInit() {
    await this.isLinkUsed();
  }

  goToLogin() {
    this.router.navigate(['']);
  }

  checkIfPasswordEntered() {
    if (this.password1 && this.password2 && this.changepasswordbutton) {
      this.changepasswordbutton.nativeElement.disabled = true;
      let value1 = this.password1.nativeElement.value;
      let value2 = this.password2.nativeElement.value;
      if (value1 == '' || value2 == '' || value1 != value2) {
        return;
      }
      if (!this.checkinputservice.isValidUserpassword(value1)) {
        return;
      }
      this.changepasswordbutton.nativeElement.disabled = false;
    }
  }

  async callchangePassword(event: Event) {
    event.preventDefault();
    if (!this.password1) {
      return;
    }
    await this.authservice.changePassword(this.route.snapshot.queryParams['oobCode'], this.password1.nativeElement.value);
  }

  async isLinkUsed() {
    let oobCode = this.route.snapshot.queryParams['oobCode'];
    if (!oobCode) {
      this.router.navigate(['**']);
      return;
    }
    this.linkused = await this.authservice.verifyooBCode(oobCode);
    this.loaded = this.linkused ? !this.linkused : true;
    this.linkused = this.linkused ? this.linkused : false;
  }

}
