import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule } from '@angular/forms';
import { Channel } from '../../models/channel.class';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';

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
  presentAccountname!:any;
  ChannelName:string = '';
  ChannelDescription:string = '';

  newChannelObject!:Channel;

  constructor(private chatService: ChatService, private presentAccount:AuthService, private accountsJSON:AccountService) {}

  ngOnInit() {
    this.subscription = this.chatService.channelCreated$.subscribe(
      state => this.openCreate = state
    );
  }

  checkDisabledButton(){
    if(this.ChannelName.length >= 2){
      this.checkDisabled = false;
    }else{
      this.checkDisabled = true;
    }
  }

  close() {
    this.openCreate = false;
    this.ChannelName = '';
    this.ChannelDescription = '';
    this.checkDisabled = true;
  }

  close2(){
    this.openCreate2 = false;
    this.whichCreate = 1;
    this.checkDisabled = true;
  }

  nextpage(){
    this.whichCreate = 2;
    this.openCreate2 = true;
    this.ChannelName = '';
    this.ChannelDescription = '';
  }

  findLoginAccount(){
    this.presentAccountname = this.accountsJSON.accounts.filter(obj => obj.accountId == this.presentAccount.userId);
    this.presentAccount.userInformation = this.presentAccountname[0];
    if(!this.presentAccount.userInformation.name.endsWith(" (Du)")){
      this.presentAccount.userInformation.name += ' (Du)';
    }
    return this.presentAccountname[0].name;
  }

  saveNameOfChannel(){
    let JSON =  new Channel('', [],this.ChannelName,this.ChannelDescription, true, this.findLoginAccount())
    this.chatService.incompleteCreateChannel = JSON;
    console.log(this.chatService.incompleteCreateChannel);
    this.nextpage();
  }
}
