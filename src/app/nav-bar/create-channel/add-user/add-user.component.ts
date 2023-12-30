import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../services/chat.service';
import { AccountService } from '../../../services/account.service';
import { AvatarComponent } from '../../../shared/avatar/avatar.component';
import { FormsModule } from '@angular/forms';
import { Account } from '../../../models/account.class';
import { Channel } from '../../../models/channel.class';
import { CreateChannelComponent } from '../create-channel.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule,AvatarComponent,FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit{
  choose:boolean = false;
  input:string = '';
  accountService!: AccountService;
  filteredAccounts: Account[] = [];
  fullObj!:AccountService;
  NoUserFound:boolean = false
  search:boolean = false;
  ableButton:boolean = false;
  savedUser:any[] = [];
  private:boolean = false;

  constructor(private chatService: ChatService,private CreateChannel:CreateChannelComponent) {
    this.accountService = inject(AccountService);
    this.fullObj = this.accountService;
  }


  ngOnInit(): void {
    this.filteredAccounts = this.accountService.accounts;
  }

  togglePrivate(){
    this.private = !this.private;
  }

  settingButton(){
    if(this.choose == false){
      this.ableButton = false;
    }else if(this.savedUser.length != 0){
      this.ableButton = false;
    }else{
      this.ableButton = true;
    }
  }

  toggleChoose(){
    this.choose = !this.choose;
    this.settingButton();
  }

  sortArray(){
    this.filteredAccounts.sort((a, b) => a.name.localeCompare(b.name));
  }

  renderInDiv(id:string){
    let user = this.filteredAccounts.find(obj => obj.accountId.toLowerCase().includes(id.toLowerCase()));
    if (user) {
      this.savedUser.push(user);
      this.filteredAccounts = this.filteredAccounts.filter(obj => obj.accountId !== id); 
      this.filteredAccounts = this.filteredAccounts.filter(obj => !this.savedUser.includes(obj));
    }
    this.checkIfFilterAccounsIsNull();
    this.settingButton();
  }

  checkIfFilterAccounsIsNull(){
    if(this.filteredAccounts.length == 0){
      this.NoUserFound = true;
    }else{
      this.NoUserFound = false;
    }
  }

  FilterArrayByName(){
    if(this.input != ''){
      this.search = true;
      this.filteredAccounts = this.fullObj.accounts.filter(obj => obj.name.toLowerCase().includes(this.input.toLowerCase())); 
      if(this.savedUser.length != 0){
        this.filteredAccounts = this.filteredAccounts.filter(obj => !this.savedUser.includes(obj));
      }
      this.sortArray();
      this.checkIfFilterAccounsIsNull();
    } else {
      this.filteredAccounts = [...this.fullObj.accounts];
      this.search = false;
    }
  }

  Addpeople(JSON:any){
    return JSON.publicStatus = !this.private;
  }

  remove(User:Account){
    console.log(User);
    this.filteredAccounts.push(User);
    this.savedUser = this.savedUser.filter(obj => !this.filteredAccounts.includes(obj));
    this.checkIfFilterAccounsIsNull();
    this.settingButton();
  }

  createChannelByArray(){
    let JSON = this.chatService.incompleteCreateChannel;
    if(this.choose == true){
      for(let i = 0; i < this.savedUser.length; i++){
        JSON.memberIds.push(this.savedUser[i].id);
      }
    }else{
      for(let i = 0; i < this.accountService.accounts.length; i++){
        JSON.memberIds.push(this.accountService.accounts[i].accountId);
      }
    }
    this.Addpeople(JSON)
    console.log(JSON);
    this.CreateChannel.close2();
    this.chatService.addChatOrChannel(JSON, 'channels');
  }
}
