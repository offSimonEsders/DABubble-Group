import { Component } from '@angular/core';
import { Channel } from '../../models/channel.class';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-edit-channel',
  standalone: true,
  imports: [],
  templateUrl: './edit-channel.component.html',
  styleUrl: './edit-channel.component.scss'
})
export class EditChannelComponent {
  informationOfChannel!: Channel;

  constructor(private chat:MessageService){
    this.informationOfChannel = this.chat.editChannel;
  }
}
