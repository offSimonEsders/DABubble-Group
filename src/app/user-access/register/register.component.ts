import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements AfterViewInit {

  loginFrame!: HTMLDivElement;
  registerFrame!: HTMLDivElement;
  newatbubble!: HTMLDivElement;

  constructor() {

  }

  ngAfterViewInit() {
    this.loginFrame = <HTMLDivElement>document.querySelector('.login-frame');
    this.registerFrame = <HTMLDivElement>document.querySelector('.register-frame');
    this.newatbubble = <HTMLDivElement>document.querySelector('.new-at-bubble');
  }

  showRegistration() {
    this.loginFrame.style.display = 'flex';
    this.registerFrame.style.display = 'none';
    this.newatbubble.style.display = 'flex';
  }

}
