import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ChooseACharacterComponent } from "./choose-acharacter/choose-acharacter.component";
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [ChooseACharacterComponent]
})
export class RegisterComponent implements AfterViewInit {

  loginFrame!: HTMLDivElement;
  registerFrame!: HTMLDivElement;
  newatbubble!: HTMLDivElement;
  chosecharacterFrame!: HTMLDivElement;
  registrationusername!: HTMLInputElement;
  registrationuseremail!: HTMLInputElement;
  registrationuserpassword!: HTMLInputElement;
  choosenamecontainer!: HTMLHeadElement;

  constructor(private storageService: StorageService) {
  }

  ngAfterViewInit() {
    this.loginFrame = <HTMLDivElement>document.querySelector('.login-frame');
    this.registerFrame = <HTMLDivElement>document.querySelector('.register-frame');
    this.newatbubble = <HTMLDivElement>document.querySelector('.new-at-bubble');
    this.chosecharacterFrame = <HTMLDivElement>document.querySelector('.choose-a-character-frame');
    this.registrationusername = <HTMLInputElement>document.getElementById('registration-username');
    this.registrationuseremail = <HTMLInputElement>document.getElementById('registration-useremail');
    this.registrationuserpassword = <HTMLInputElement>document.getElementById('registration-userpassword');
    this.choosenamecontainer = <HTMLHeadElement>document.getElementById('choose-name-container');
  }

  showLogin() {
    this.loginFrame.style.display = 'flex';
    this.registerFrame.style.display = 'none';
    this.newatbubble.style.display = 'flex';
  }

  showChooseACharacter(event: Event) {
    this.getRegistrationData();
    event.preventDefault();
    this.registerFrame.style.display = 'none';
    this.chosecharacterFrame.style.display = 'flex';
  }

  getRegistrationData() {
    this.choosenamecontainer.textContent = this.registrationusername.value;
  }

  validateRegistrationData() {
    if (!this.isValidUsername(this.registrationusername.value)) {
      return;
    }
    if (!this.isValidUseremail(this.registrationuseremail.value)) {
      return;
    }
    if (!this.isValidUserpassword(this.registrationuserpassword.value)) {
      return;
    }
  }

  isValidUsername(username: string): boolean {
    return username.length > 0;
  }

  isValidUseremail(email: string): boolean {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  isValidUserpassword(password: string): boolean {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  }

}
