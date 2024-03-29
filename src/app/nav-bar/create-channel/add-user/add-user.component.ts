import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../services/chat.service';
import { AccountService } from '../../../services/account.service';
import { AvatarComponent } from '../../../shared/avatar/avatar.component';
import { FormsModule } from '@angular/forms';
import { Account } from '../../../models/account.class';
import { CreateChannelComponent } from '../create-channel.component';
import { AuthService } from '../../../services/auth.service';
import { Channel } from '../../../models/channel.class';
import { updateDoc } from '@angular/fire/firestore';
import { UiService } from '../../../services/UiService.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, AvatarComponent, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  choose: boolean = false;
  input: string = '';
  accountService!: AccountService;
  filteredAccounts: Account[] = [];
  fullObj!: AccountService;
  NoUserFound: boolean = false;
  search: boolean = false;
  ableButton: boolean = false;
  savedUser: any[] = [];
  private: boolean = false;
  allUser:boolean = true;

  constructor(
    private chatService: ChatService,
    public presentAccount: AuthService,
    private UiService:UiService
  ) {
    this.accountService = inject(AccountService);
    this.fullObj = this.accountService;
  }

  ngOnInit(): void {
    this.filteredAccounts = this.accountService.accounts;
    this.savedUser.push(this.presentAccount.user);
  }

  togglePrivate() {
    this.private = !this.private;
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

  Addpeople(JSON: any) {
    return (JSON.publicStatus = !this.private);
  }

  remove(User: Account) {
    if (
      !this.filteredAccounts.some(
        (el) => JSON.stringify(el) === JSON.stringify(User)
      )
    ) {
      this.filteredAccounts.push(User);
      this.savedUser = this.savedUser.filter(
        (obj) => !this.filteredAccounts.includes(obj)
      );
    }
    this.savedUser = this.savedUser.filter(
      (obj) => !this.filteredAccounts.includes(obj)
    );
    this.checkIfFilterAccounsIsNull();
    this.settingButton();
  }

  createChannelByArray() {
    let JSON = this.chatService.incompleteCreateChannel;
    if (this.choose == true) {
      for (let i = 0; i < this.savedUser.length; i++) {
        JSON.memberIds.push(this.savedUser[i].id);
      }
    } else {
      for (let i = 0; i < this.accountService.accounts.length; i++) {
        JSON.memberIds.push(this.accountService.accounts[i].accountId);
      }
    }
    this.AddAndClose(JSON);
  }

  addUser(JSON:any){
    return (JSON.allUser = this.allUser);
  }

  AddAndClose(JSON: Channel) {
    this.Addpeople(JSON);
    this.addUser(JSON);
    this.UiService.close2();
    this.chatService.addChatOrChannel(JSON, 'channels').then((doc: any) => {
      updateDoc(doc, { id: doc.id });
    });
  }
}
