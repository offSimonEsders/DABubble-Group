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
  @ViewChild('email1') email1?: ElementRef;
  @ViewChild('email2') email2?: ElementRef;
  @ViewChild('changepasswordbutton') changepasswordbutton?: ElementRef;
  @ViewChild('changeemailbutton') changeemailbutton?: ElementRef;
  @ViewChild('userfeedbackresetpassword') userfeedbackresetpassword?: any;

  linkused!: boolean;
  loaded: boolean = false;
  email: boolean = false;

  constructor(private router: Router, private authservice: AuthService, private route: ActivatedRoute, private checkinputservice: CheckInputService, private ngzone: NgZone) {

  }
  async ngOnInit() {
    await this.isLinkUsed();
    this.findURL();
  }

  findURL(){
    const mode = this.route.snapshot.queryParamMap.get('mode');
    if (mode === 'verifyAndChangeEmail') {
      this.email = true;
    }else{
      this.email = false;
    }
  }

  goToLogin() {
    this.router.navigate(['']);
  }

  checkIfEmailEntered(){
    if (this.email1 && this.email2 && this.changepasswordbutton) {
      this.changepasswordbutton.nativeElement.disabled = true;
      let value1 = this.email1.nativeElement.value;
      let value2 = this.email2.nativeElement.value;
      if (value1 == '' || value2 == '' || value1 != value2) {
        return;
      }
      if (!this.checkinputservice.isValidUseremail(value1)) {
        return;
      }
      if(this.changeemailbutton){
        this.changeemailbutton.nativeElement.disabled = false;
      }
      
    }
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

  callchangeEmail(event:Event){
    event.preventDefault();
    if (!this.email1) {
      return;
    }
    this.showAnimationAndLoadogin();
    this.disableEmailInputAndButton();
    this.authservice.updateEmail(this.email1.nativeElement.value);
  }

  async callchangePassword(event: Event) {
    event.preventDefault();
    if (!this.password1) {
      return;
    }
    this.showAnimationAndLoadogin();
    this.disableInputAndButton();
    await this.authservice.changePassword(this.route.snapshot.queryParams['oobCode'], this.password1.nativeElement.value);
  }

  disableEmailInputAndButton(){
    if(this.changeemailbutton && this.email1 && this.email2) {
      this.changeemailbutton.nativeElement.disabled = true;
      this.email1.nativeElement.disabled = true;
      this.email2.nativeElement.disabled = true;
    }
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

  showAnimationAndLoadogin() {
    this.userfeedbackresetpassword.nativeElement.style.display = 'flex';
    setTimeout(() => {
      this.router.navigate(['']);
    }, 2000);
  }

  disableInputAndButton() {
    if(this.changepasswordbutton && this.password1 && this.password2) {
      this.changepasswordbutton.nativeElement.disabled = true;
      this.password1.nativeElement.disabled = true;
      this.password2.nativeElement.disabled = true;
    }
  }

}
