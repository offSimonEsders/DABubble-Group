import { Component, OnInit } from '@angular/core';
import { Channel } from '../../models/channel.class';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { ChannelBoxComponent } from '../channel-box/channel-box.component';
import { AuthService } from '../../services/auth.service';
import { ShowMemberComponent } from '../show-member/show-member.component';
import { UiService } from '../../services/UiService.service';

@Component({
  selector: 'app-edit-channel',
  standalone: true,
  imports: [CommonModule,FormsModule,ShowMemberComponent],
  templateUrl: './edit-channel.component.html',
  styleUrl: './edit-channel.component.scss',
})
export class EditChannelComponent implements OnInit{
  informationOfChannel!: Channel;
  editChannelName:boolean = false;
  editChannelDiscription:boolean = false;
  nameChannel!:string;
  discriptionChannel!:string;
  disabeldButton:boolean = false;

  leaveGuest:boolean = false;

  constructor(private chat:MessageService, private update:ChatService, private auth:AuthService,private UiService:UiService){
    this.informationOfChannel = this.chat.editChannel;
    this.nameChannel = this.informationOfChannel.name;
    this.discriptionChannel = this.informationOfChannel.description;
  }

  ngOnInit(): void {

   
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
      this.disabeldButton = false;
    }else{
      this.disabeldButton = true;
    }
  }

  closeWindow(){
    this.editChannelName = false
    this.editChannelDiscription = false;
    this.UiService.openEditView();
  }

  changeName(){
    if(!this.disabeldButton){
      if(this.nameChannel != this.informationOfChannel.name){
        this.informationOfChannel.name = this.nameChannel
        this.update.updateChannel(this.informationOfChannel,this.informationOfChannel.id);
        this.editChannelName = false;
      }else{
        this.editChannelName = false;
      }
    }
  }

  changeDiscription(){
      if(this.discriptionChannel != this.informationOfChannel.description){
        this.informationOfChannel.description = this.discriptionChannel;
        this.update.updateChannel(this.informationOfChannel,this.informationOfChannel.id);
        this.editChannelDiscription = false;
      }else{
        this.editChannelDiscription = false;
      }
  }

  openNameEdit(){
    this.editChannelName = true;
  }

  openDiscription(){
    this.editChannelDiscription = true;
  }

  removeFromChannel(){
    const index = this.informationOfChannel.memberIds.indexOf(this.auth.userId);
    if(this.auth.user.id == 'pesOSpHsgAt97WwG705y'){
      this.leaveGuest = true;

      setTimeout(() => {
        this.leaveGuest = false;
      }, 3000);
    }else{
      if (index !== -1) {
        this.informationOfChannel.memberIds.splice(index, 1);
        this.update.updateChannel(this.informationOfChannel,this.informationOfChannel.id);
        this.closeWindow()
      } else {
        this.closeWindow()
      }
    }
    }
    
}
