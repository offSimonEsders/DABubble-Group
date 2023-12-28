import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ChooseACharacterComponent } from "./choose-acharacter/choose-acharacter.component";

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [ChooseACharacterComponent]
})
export class RegisterComponent implements AfterViewInit {

  @ViewChild('registerinputcontainername') registerinputcontainername!: any;
  @ViewChild('registerinputcontaineremail') registerinputcontaineremail!: any;
  @ViewChild('registerinputcontainerpassword') registerinputcontainerpassword!: any;

  loginFrame!: HTMLDivElement;
  registerFrame!: HTMLDivElement;
  chosecharacterFrame!: HTMLDivElement;
  registrationusername!: HTMLInputElement;
  registrationuseremail!: HTMLInputElement;
  registrationuserpassword!: HTMLInputElement;
  acceptdsgvo!: HTMLInputElement;
  registeragreement!: HTMLDivElement;
  choosenamecontainer!: HTMLHeadElement;

  userData = {
    username: '',
    useremail: '',
    userpassword: ''
  }

  constructor() {
    
  }

  ngAfterViewInit() {
    this.loginFrame = <HTMLDivElement>document.querySelector('.login-frame');
    this.registerFrame = <HTMLDivElement>document.querySelector('.register-frame');
    this.chosecharacterFrame = <HTMLDivElement>document.querySelector('.choose-a-character-frame');
    this.registrationusername = <HTMLInputElement>document.getElementById('registration-username');
    this.registrationuseremail = <HTMLInputElement>document.getElementById('registration-useremail');
    this.registrationuserpassword = <HTMLInputElement>document.getElementById('registration-userpassword');
    this.acceptdsgvo = <HTMLInputElement>document.getElementById('accept-dsgvo');
    this.registeragreement = <HTMLDivElement>document.getElementById('register-agreement');
    this.choosenamecontainer = <HTMLHeadElement>document.getElementById('choose-name-container');
  }

  showLogin() {
    this.resetRegistrationForm();
    this.loginFrame.style.display = 'flex';
    this.registerFrame.style.display = 'none';
  }

  showChooseACharacter(event: Event) {
    this.getRegistrationData();
    this.validateRegistrationData();
    event.preventDefault();
  }

  getRegistrationData() {
    this.choosenamecontainer.textContent = this.registrationusername.value;
  }

  validateRegistrationData() {
    let stop = false;
    if (!this.isValidUsername(this.registrationusername.value)) {
      this.registerinputcontainername.nativeElement.classList.add('invalid-username');
      stop = true;
    }
    if (!this.isValidUseremail(this.registrationuseremail.value)) {
      this.registerinputcontaineremail.nativeElement.classList.add('invalid-useremail');
      stop = true;
    }
    if (!this.isValidUserpassword(this.registrationuserpassword.value)) {
      this.registerinputcontainerpassword.nativeElement.classList.add('invalid-userpassword');
      stop = true;
    }
    if (!this.acceptdsgvo.checked) {
      this.registeragreement.classList.add('invalid-agreement');
      stop = true;
    }
    if (stop) {
      return;
    }
    this.setRegistrationData();
    this.registerFrame.style.display = 'none';
    this.chosecharacterFrame.style.display = 'flex';
  }

  setRegistrationData() {
    this.userData.username = this.registrationusername.value;
    this.userData.useremail = this.registrationuseremail.value;
    this.userData.userpassword = this.registrationuserpassword.value;
  }

  resetRegistrationForm() {
    this.registrationusername.value = '';
    this.registrationuseremail.value = '';
    this.registrationuserpassword.value = '';
    this.acceptdsgvo.checked = false;
    this.resetRegistrationNameContainer();
    this.resetRegistrationEmailContainer();
    this.resetRegistrationPasswordContainer();
    this.resetRegistrationAgreementContainer();
  }

  resetRegistrationNameContainer() {
    this.registerinputcontainername.nativeElement.classList.remove('invalid-username');
  }

  resetRegistrationEmailContainer() {
    this.registerinputcontaineremail.nativeElement.classList.remove('invalid-useremail');
  }

  resetRegistrationPasswordContainer() {
    this.registerinputcontainerpassword.nativeElement.classList.remove('invalid-userpassword');
  }

  resetRegistrationAgreementContainer() {
    this.registeragreement.classList.remove('invalid-agreement');
  }

  isValidUsername(username: string): boolean {
    return username.length > 0;
  }

  isValidUseremail(email: string): boolean {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  isValidUserpassword(password: string): boolean {
    let regex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{8,}$/i;;
    return regex.test(password);
  }

  isValidAgreement() {
    if (this.acceptdsgvo.checked) {
      this.resetRegistrationAgreementContainer();
      return;
    }
  }

}
