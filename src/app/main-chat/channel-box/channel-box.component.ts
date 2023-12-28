import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HoverStyleDirective } from './hover-style.directive';
import { Channel } from '../../models/channel.class';

@Component({
  selector: 'app-channel-box',
  standalone: true,
  imports: [CommonModule, HoverStyleDirective],
  templateUrl: './channel-box.component.html',
  styleUrl: './channel-box.component.scss',
})
export class ChannelBoxComponent implements OnInit {
  @Input() introStyle!: string;
  @Input() currentChannel!: Channel;
  onHover = false;

  ngOnInit(): void {}
}
