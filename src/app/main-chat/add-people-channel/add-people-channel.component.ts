import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Account } from '../../models/account.class';
import { ChatService } from '../../services/chat.service';
import { CreateChannelComponent } from '../../nav-bar/create-channel/create-channel.component';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-add-people-channel',
  standalone: true,
  imports: [CommonModule,AvatarComponent,FormsModule],
  templateUrl: './add-people-channel.component.html',
  styleUrl: './add-people-channel.component.scss'
})
export class AddPeopleChannelComponent {
  choose: boolean = false;
  input: string = '';
  accountService!: AccountService;
  filteredAccounts: Account[] = [];
  fullObj!: AccountService;
  NoUserFound: boolean = false;
  search: boolean = false;
  ableButton: boolean = false;
  savedUser: any[] = [];
  allUser:boolean = true;

  constructor(
    private chatService: ChatService,
    private CreateChannel: CreateChannelComponent,
    public presentAccount: AuthService,
    private chat:MessageService,
  ) {
    this.accountService = inject(AccountService);
    this.fullObj = this.accountService;
  }

  ngOnInit(): void {
    this.filteredAccounts = this.accountService.accounts;
    this.pushAllUserToArray();
  }

  pushAllUserToArray(){
    this.savedUser = this.chatService.currentChannelAccounts;
    this.filterFunction()
  }


  settingButton() {
    if (this.choose == false) {
      this.ableButton = false;
    } else if (this.savedUser.length != 0) {
      this.ableButton = false;
    } else {
      this.ableButton = true;
    }
  }

  toggleChoose() {
    this.allUser = !this.allUser;
    this.choose = !this.choose;
    this.settingButton();
    this.clearsaveUser();
  }

  clearsaveUser() {
    this.filteredAccounts = this.accountService.accounts;
    this.filteredAccounts = this.filteredAccounts.filter(
      (obj) => !this.savedUser.includes(obj)
    );
    this.savedUser = [];
    this.savedUser.push(this.presentAccount.user);
    this.input = '';
    this.NoUserFound = false;
  }

  sortArray() {
    this.filteredAccounts.sort((a, b) => a.name.localeCompare(b.name));
  }

  ifUserExists(user: any, id: string) {
    if (user) {
      this.savedUser.push(user);
      this.filteredAccounts = this.filteredAccounts.filter(
        (obj) => obj.accountId !== id
      );
      this.filteredAccounts = this.filteredAccounts.filter(
        (obj) => !this.savedUser.includes(obj)
      );
    }
  }

  renderInDiv(id: string) {
    let user = this.filteredAccounts.find((obj) =>
      obj.accountId.toLowerCase().includes(id.toLowerCase())
    );
    this.ifUserExists(user, id);
    this.checkIfFilterAccounsIsNull();
    this.settingButton();
  }

  checkIfFilterAccounsIsNull() {
    if (this.filteredAccounts.length == 0) {
      this.NoUserFound = true;
    } else {
      this.NoUserFound = false;
    }
  }

  filterFunction() {
    this.search = true;
    this.filteredAccounts = this.fullObj.accounts.filter((obj) =>
      obj.name.toLowerCase().includes(this.input.toLowerCase())
    );
    if (this.savedUser.length != 0) {
      this.filteredAccounts = this.filteredAccounts.filter(
        (obj) => !this.savedUser.includes(obj)
      );
    }
  }

  FilterArrayByName() {
    if (this.input != '') {
      this.filterFunction();
      this.sortArray();
      this.checkIfFilterAccounsIsNull();
    } else {
      this.filteredAccounts = [...this.fullObj.accounts];
      this.search = false;
    }
  }

}
