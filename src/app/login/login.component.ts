import { Component } from '@angular/core';
import { StartAnimationComponent } from "../start-animation/start-animation.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [StartAnimationComponent]
})
export class LoginComponent {

}
