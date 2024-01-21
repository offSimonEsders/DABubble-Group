import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HoverStyleDirective } from './hover-style.directive';
import { Channel } from '../../models/channel.class';
import { EditChannelComponent } from '../edit-channel/edit-channel.component';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-channel-box',
  standalone: true,
  imports: [CommonModule, HoverStyleDirective,EditChannelComponent],
  templateUrl: './channel-box.component.html',
  styleUrl: './channel-box.component.scss',
})
export class ChannelBoxComponent implements OnInit {
  @Input() introStyle!: string;
  @Input() currentChannel!: Channel;
  onHover = false;
  openEdit = false;

  constructor(private chat:MessageService){}

  ngOnInit(): void {}

  openEditViewFromChannel(){
    if(this.currentChannel){
      this.chat.editChannel = this.currentChannel;
      this.openEditView();
    }

  }

  openEditView(){
    this.openEdit = !this.openEdit;
  }
}
