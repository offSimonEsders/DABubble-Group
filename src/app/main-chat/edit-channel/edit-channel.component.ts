import { Component } from '@angular/core';
import { Channel } from '../../models/channel.class';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-edit-channel',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-channel.component.html',
  styleUrl: './edit-channel.component.scss'
})
export class EditChannelComponent {
  informationOfChannel!: Channel;
  editChannelName:boolean = true;
  editChannelDiscription:boolean = true;
  nameChannel!:string;
  discriptionChannel!:string;
  disabeldButton:boolean = false;

  constructor(private chat:MessageService, private update:ChatService){
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

  editChannelNameFuction(){
    if(this.nameChannel != ''){
      console.log('enable edit')
      this.disabeldButton = false;
    }else{
      console.log('disabe edit')
      this.disabeldButton = true;
    }
  }

  changeName(){
    if(this.nameChannel != this.informationOfChannel.name){
      this.informationOfChannel.name = this.nameChannel
      this.update.updateChannel(this.informationOfChannel,this.informationOfChannel.id);
    }
    
  }
}
