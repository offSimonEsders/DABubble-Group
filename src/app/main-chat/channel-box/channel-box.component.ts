import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HoverStyleDirective } from './hover-style.directive';

@Component({
  selector: 'app-channel-box',
  standalone: true,
  imports: [CommonModule, HoverStyleDirective],
  templateUrl: './channel-box.component.html',
  styleUrl: './channel-box.component.scss',
})
export class ChannelBoxComponent {
  @Input() introStyle!: string;
  onHover = false;
  currentChat = {
    name: 'Entwicklerteam',
    description: 'Hier ist eine Beschreibung',
    access: 'public',
    creater: 'Frederik Beck',
  };
}
