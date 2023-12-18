import { Component } from '@angular/core';
import { AvatarComponent } from '../../avatar/avatar.component';

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  imports: [AvatarComponent],
})
export class MessageComponent {}
