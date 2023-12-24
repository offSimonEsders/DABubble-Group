import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../services/chat.service';
import { AccountService } from '../../../services/account.service';
import { AvatarComponent } from '../../../shared/avatar/avatar.component';
import { FormsModule } from '@angular/forms';
import { Account } from '../../../models/account.class';

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

  search:boolean = false;

  savedUser:any[] = [];

  constructor(private chatService: ChatService) {
    this.accountService = inject(AccountService);
    this.fullObj = this.accountService;
  }


  ngOnInit(): void {
    this.filteredAccounts = this.accountService.accounts
  }

  toggleChoose(){
    this.choose = !this.choose;
  }

  sortArray(){
    this.filteredAccounts.sort((a, b) => a.name.localeCompare(b.name));
    
  }

  renderInDiv(id:string){
    let user = this.filteredAccounts.find(obj => obj.accountId.toLowerCase().includes(id.toLowerCase()));
    if (user) {
      this.savedUser.push(user);
      this.filteredAccounts = this.filteredAccounts.filter(obj => obj.accountId !== id); 
    }
  }

  FilterArrayByName(){
    if(this.input != ''){
      this.search = true;
      this.filteredAccounts = this.fullObj.accounts.filter(obj => obj.name.toLowerCase().includes(this.input.toLowerCase())); 

      this.sortArray();
      console.log(this.filteredAccounts,this.accountService.accounts);
    } else {
      this.filteredAccounts = [...this.fullObj.accounts];
      this.search = false;
    }
  }

  // sortArrayByName(){
  //   this.accountServiceObj.accounts = [...this.accountService.accounts];
  //   if(this.input != ''){
  //     this.accountServiceObj.accounts = this.fullObj.accounts.filter(obj => obj.name.toLowerCase().includes(this.input.toLowerCase())); 
  //     console.log(this.accountServiceObj.accounts);
  //   }
    
  // }

  Addpeople(){
    if(!this.choose){
      this.chatService.incompleteCreateChannel.publicStatus = true;
    }else{
      this.chatService.incompleteCreateChannel.publicStatus = false;
    }
    console.log(this.accountService.accounts ,this.chatService.incompleteCreateChannel);
  }
}
