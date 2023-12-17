import { AfterViewInit, Component } from '@angular/core';
import { StartAnimationComponent } from "./start-animation/start-animation.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@Component({
    selector: 'app-user-access',
    standalone: true,
    templateUrl: './user-access.component.html',
    styleUrl: './user-access.component.scss',
    imports: [StartAnimationComponent, LoginComponent, RegisterComponent]
})
export class UserAccessComponent implements AfterViewInit {

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
      this.loginFrame.style.display = 'none';
      this.registerFrame.style.display = 'flex';
      this.newatbubble.style.display = 'none';
    }

}
