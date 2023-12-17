import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HoverStyleDirective } from './hover-style.directive';

@Component({
  selector: 'app-current-chat-intro',
  standalone: true,
  imports: [CommonModule, HoverStyleDirective],
  templateUrl: './current-chat-intro.component.html',
  styleUrl: './current-chat-intro.component.scss',
})
export class CurrentChatIntroComponent {
  @Input() introStyle!: string;
  onHover = false;
}
