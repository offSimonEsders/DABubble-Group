import { Component } from '@angular/core';
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
export class UserAccessComponent {

}
