import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AccountService } from './account.service';
import { ChatService } from './chat.service';
import { MessageService } from './message.service';
import { ProviderService } from './provider.service';
import { Chat } from '../models/chat.class';
import { updateDoc } from '@angular/fire/firestore';
import { Channel } from '../models/channel.class';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenChatFromProfileViewService {
  private WhichEdit: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private WhichEdit2: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private checkDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);


  checkDisabledObservabl$: Observable<boolean> = this.checkDisabled.asObservable();
  WhichEditObservabl2$: Observable<boolean> = this.WhichEdit2.asObservable();
  WhichEditObservabl$: Observable<number> = this.WhichEdit.asObservable();
  constructor(private authService: AuthService, private accountService: AccountService, private chatService: ChatService, private messageService: MessageService, private provider: ProviderService) { }
  

  async openChat(chatColl: string, accId: string) {
    if (this.chatService.chats.length === 0) {
      this.createNewPrivateChat(chatColl, accId);
    }
    for (let i = 0; i < this.chatService.chats.length; i++) {
      if (this.privateChatExists(i, accId)) {
        this.privateChatExistsFunction(chatColl, i, accId);
        break;
      }
      if (this.noPrivateChatExists(i)) {
        this.createNewPrivateChat(chatColl, accId);
      }
    }
    this.openMobileView();
  }

  openMobileView(){
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    if (screenWidth <= 1000) {
      this.chatService.swichPictureFunction();
      this.provider.swichMobileChat();
    }
  }

    // prettier-ignore
    privateChatExistsFunction(chatColl: string, i: number, accId: string) {
      this.messageService.checkForExistingMessages(chatColl, this.chatService.chats[i].id);
      this.chatService.currentChat = this.chatService.chats[i];
      this.emitChatInfo(chatColl, accId);
    }

  privateChatExists(index: number, accId: string) {
    return (
      (this.chatService.chats[index].memberIds.includes(accId) &&
      this.chatService.chats[index].memberIds.includes(this.authService.user.accountId) &&
      accId !== this.authService.user.accountId) ||
      (this.chatService.chats[index].memberIds[0] === accId && this.chatService.chats[index].memberIds[1] === accId)
    );
  }

  async createNewPrivateChat(chatColl: string, accId: string) {
    let newChat = new Chat('', [this.authService.user.accountId, accId]);
    this.chatService.addChatOrChannel(newChat, 'chats').then((doc: any) => {
      updateDoc(doc, { id: doc.id });
      this.messageService.checkForExistingMessages(chatColl, doc.id);
      this.chatService.setCurrentChatOrCurrentChannel(chatColl, doc.id);
    });
    this.emitChatInfo(chatColl, accId);
  }


  emitChatInfo(chatColl: string, accId: string) {
    this.chatService.openChatEmitter.next({
      chatColl: chatColl,
      accountId: accId,
    });
  }
  noPrivateChatExists(i: number) {
    return i === this.chatService.chats.length - 1;
  }

  async openChannel(collId: string, channelId: string) {
    this.messageService.checkForExistingMessages(collId, channelId);
    this.chatService.getChannel(channelId).then((channel: Channel) => {
      this.chatService.currentChannel = channel;
      this.messageService.editChannel = this.chatService.currentChannel;
      this.chatService.openChatEmitter.next({ chatColl: collId });
    });
    this.openMobileView();
  }

  close2() {
    this.WhichEdit2.next(false);
    this.WhichEdit.next(1);
    this.checkDisabled.next(true);
    this.chatService.channelCreated(false);
  }




//--------------------HeaderComponet---------------------//

  private profileViewHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  profileViewHeaderObservabl$: Observable<boolean> = this.profileViewHeader.asObservable();

  private openEditMemberHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  openEditMemberHeaderObservabl$: Observable<boolean> = this.openEditMemberHeader.asObservable();

  setFalseForChatHeader(){
    this.profileViewHeader.next(false);
    this.openEditMemberHeader.next(false);
  }
}
