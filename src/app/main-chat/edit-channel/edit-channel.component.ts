import { Component } from '@angular/core';
import { Channel } from '../../models/channel.class';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-channel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-channel.component.html',
  styleUrl: './edit-channel.component.scss'
})
export class EditChannelComponent {
  informationOfChannel!: Channel;
  editChannelName:boolean = true;
  editChannelDiscription:boolean = true;
  nameChannel!:string;
  discriptionChannel!:string;

  constructor(private chat:MessageService){
    this.informationOfChannel = this.chat.editChannel;
    console.log(this.informationOfChannel)
    this.nameChannel = this.informationOfChannel.name;
    this.discriptionChannel = this.informationOfChannel.description;
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
