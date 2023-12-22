import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule } from '@angular/forms';
import { Channel } from '../../models/channel.class';

@Component({
  selector: 'app-create-channel',
  standalone: true,
  imports: [CommonModule,AddUserComponent,FormsModule],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.scss',
})
@Injectable({
  providedIn: 'root',
})
export class CreateChannelComponent {
  openCreate: boolean = false;
  whichCreate: number = 1;
  subscription: any;
  openCreate2!:boolean;
  checkDisabled:boolean = true;

  ChannelName:string = '';
  ChannelDescription:string = '';

  newChannelObject!:Channel;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.subscription = this.chatService.channelCreated$.subscribe(
      state => this.openCreate = state
    );
  }

  checkDisabledButton(){
    if(this.ChannelName.length >= 3){
      this.checkDisabled = false;
    }else{
      this.checkDisabled = true;
    }
  }

  close() {
    this.openCreate = false;
  }

  close2(){
    this.openCreate2 = false;
    this.whichCreate = 1;
  }

  nextpage(){
    this.whichCreate = 2;

    this.openCreate2 = true;
  }

  saveNameOfChannel(){
    let JSON =  new Channel('', [''],this.ChannelName,this.ChannelDescription,false, 'test',)
    console.log(JSON);
  }
}
