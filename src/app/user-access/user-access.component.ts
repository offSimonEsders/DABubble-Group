import { Component } from '@angular/core';
import { StartAnimationComponent } from "./start-animation/start-animation.component";

@Component({
    selector: 'app-user-access',
    standalone: true,
    templateUrl: './user-access.component.html',
    styleUrl: './user-access.component.scss',
    imports: [StartAnimationComponent]
})
export class UserAccessComponent {

}
