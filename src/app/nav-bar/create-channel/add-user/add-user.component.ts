import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../services/chat.service';
import { AccountService } from '../../../services/account.service';
import { AvatarComponent } from '../../../shared/avatar/avatar.component';
import { FormsModule } from '@angular/forms';

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
  accountServiceObj!: AccountService;

  fullObj!:AccountService;


  constructor(private chatService: ChatService) {
    this.accountService = inject(AccountService);
    this.accountServiceObj = this.accountService;
    this.fullObj = this.accountService;
  }


  ngOnInit(): void {
    
  }

  toggleChoose(){
    this.choose = !this.choose;
  }

  sortArrayByName(){
    this.accountServiceObj.accounts = [...this.accountService.accounts];
    if(this.input != ''){
      this.accountServiceObj.accounts = this.fullObj.accounts.filter(obj => obj.name.toLowerCase().includes(this.input.toLowerCase())); 
      console.log(this.accountServiceObj.accounts);
    }
    
  }

  Addpeople(){
    if(!this.choose){
      this.chatService.incompleteCreateChannel.publicStatus = true;
    }else{
      this.chatService.incompleteCreateChannel.publicStatus = false;
    }
    console.log(this.accountService.accounts ,this.chatService.incompleteCreateChannel);
  }
}
