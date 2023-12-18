import { AfterViewInit, Component } from '@angular/core';
import { ChooseACharacterComponent } from "./choose-acharacter/choose-acharacter.component";

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

  loadChooseACharacter(event: Event) {
    event.preventDefault();
    
  }

}
