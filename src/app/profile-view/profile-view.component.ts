import { Component } from '@angular/core';
import { AvatarComponent } from '../shared/avatar/avatar.component';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})
export class ProfileViewComponent {

}
