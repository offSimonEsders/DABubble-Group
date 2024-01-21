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
    console.log(this.informationOfChannel)
  }

  returnCreater(){
    if(this.informationOfChannel){
      if (this.informationOfChannel.creater.endsWith("(Du)")) {
        this.informationOfChannel.creater = this.informationOfChannel.creater.slice(0, -4);
        return this.informationOfChannel.creater;
      } else {
        return this.informationOfChannel.creater;
      }
    }else{
      return '';
    }
  }
}
