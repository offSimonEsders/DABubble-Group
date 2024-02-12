import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { Channel } from '../../models/channel.class';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';
import { Account } from '../../models/account.class';
import { ShowMemberComponent } from '../show-member/show-member.component';
import { AddPeopleChannelComponent } from '../add-people-channel/add-people-channel.component';
import { ProfileViewMemberComponent } from '../../profile-view-member/profile-view-member.component';
import { UiService } from '../../services/UiService.service';
import { ChannelBoxComponent } from '../channel-box/channel-box.component';

@Component({
  selector: 'app-main-chat-header',
  standalone: true,
  templateUrl: './main-chat-header.component.html',
  styleUrl: './main-chat-header.component.scss',
  imports: [AvatarComponent, CommonModule, ChannelBoxComponent,ShowMemberComponent,AddPeopleChannelComponent,ProfileViewMemberComponent],
})
export class MainChatHeaderComponent implements OnInit, OnDestroy {
  authService!: AuthService;
  chatService!: ChatService;
  accountService!: AccountService;
  private openChatSub!: Subscription;
  currentCollection = '';
  currentChannel!: Channel;
  chatWithAccount!: Account;
  openEditMember = false;
  openEditMemberEdit = false;
  profileView = false;

  constructor(public UiService:UiService) {
    this.authService = inject(AuthService);
    this.chatService = inject(ChatService);
    this.accountService = inject(AccountService);
  }

  /**
   * The ngOnInit function subscribes to an openChatEmitter and retrieves chat data based on the provided
   * chat collection and chat ID.
   */
  ngOnInit(): void {
    this.UiService.profileViewHeaderObservabl$.subscribe((value: boolean) => {
      this.profileView = value;
    });
    this.UiService.openEditMemberHeaderObservabl$.subscribe((value: boolean) => {
      this.openEditMember = value;
    });
    this.UiService.EditChatHeadObservable$.subscribe((value: boolean) => {
      this.openEditMemberEdit = value;
    });
    this.UiService.EditChatHeadObservableprofileView$.subscribe((value: boolean) => {
      this.profileView = value;
    });
    this.UiService.EditChatHeadObservableMember$.subscribe((value: boolean) => {
      this.openEditMember = value;
    });
    this.openChatSub = this.chatService.openChatEmitter.subscribe({
      next: (data) => {
        this.currentCollection = data.chatColl;
        this.currentChannel = this.chatService.currentChannel;
        if (data.accountId) {
          this.accountService.getAccount(data.accountId).then((account) => {
            this.chatWithAccount = account;
          });
        }
        if (this.currentChannel)
        this.getAllNamesOfChannelMembers();
      },
    });

  }

  openEditViewMember(){
    this.UiService.openEditViewMember();
    this.openEditMember = true;
  }

  openEditViewMemberEdit(){
    this.UiService.openEditViewMemberEdit();
    this.openEditMemberEdit = true;
  }

  async getAllNamesOfChannelMembers(){
    this.chatService.currentChannelNames = [];
    this.chatService.currentChannelAccounts = [];
    for (let i = 0; i < this.chatService.currentChannel.memberIds.length; i++) {
      let currenAccount = await this.accountService.getAccount(this.chatService.currentChannel.memberIds[i]);
      if(!this.chatService.currentChannelNames.includes(currenAccount.name)){
        this.chatService.currentChannelNames.push(currenAccount.name);
        this.chatService.currentChannelAccounts.push(currenAccount);
      }
    }
  }

  ngOnDestroy(): void {
    this.openChatSub.unsubscribe();
  }

  /**
   * The function translates the avatar elements based on the index and the number of member IDs in the current chat.
   * @param {number} index - Index of avatar element.
   * @returns a string value representing a CSS transform property.
   */
  translateAvatarElements(index: number) {
    if (index < 2 && this.currentChannel.memberIds.length > 2) {
      return 'translateX(' + 20 / (index + 1) + 'px)';
    } else if (index < 1 && this.currentChannel.memberIds.length === 2) {
      return 'translateX(' + 10 / (index + 1) + 'px)';
    } else {
      return 'translateX(0px)';
    }
  }


}
