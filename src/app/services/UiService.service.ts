import { Injectable } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { AccountService } from './account.service';
import { ChatService } from './chat.service';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { Chat } from '../models/chat.class';
import { updateDoc } from '@angular/fire/firestore';
import { Channel } from '../models/channel.class';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private dropDownSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private profileViewSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private homehideBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private openEditHeadChat: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private MemberEditChatHead: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private MemberEditChatHeadMember: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private MemberEditChatprofileView: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  EditChatHeadObservableprofileView$: Observable<boolean> = this.MemberEditChatprofileView.asObservable();
  EditChatHeadObservableMember$: Observable<boolean> = this.MemberEditChatHeadMember.asObservable();
  EditChatHeadObservable$: Observable<boolean> = this.MemberEditChatHead.asObservable();
  openEditObservable$: Observable<boolean> = this.openEditHeadChat.asObservable();
  homeBarObservable$: Observable<boolean> = this.homehideBar.asObservable();

  dropDownObservable$: Observable<boolean> = this.dropDownSubject.asObservable();
  profileViewObservable$: Observable<boolean> = this.profileViewSubject.asObservable();
  constructor(
    private auth: Auth,
    private accountService:AccountService,
    private chatService: ChatService,
    private messageService: MessageService,
    private authService: AuthService,
  ) { }

  closeDropDownProvider(){
    this.dropDownSubject.next(false);
    this.profileViewSubject.next(false);
  }

  setDropDown(value: boolean) {
    this.dropDownSubject.next(value);
  }

  setProfileView(value: boolean) {
    this.profileViewSubject.next(value);
  }
  sortAccounts() {
    this.accountService.accounts.sort((a, b) => {
      if (a.accountId == this.auth.currentUser?.uid) {
        return -1; // Verschiebe a an die erste Stelle
      } else if (b.accountId == this.auth.currentUser?.uid) {
        return 1; // Verschiebe b an die erste Stelle
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  }

  swichMobileChat() {
    this.homehideBar.next(!this.homehideBar.value);
  }


  openEditView(){
    this.openEditHeadChat.next(!this.openEditHeadChat.value);
  }


  openEditViewMemberEdit(){
    this.MemberEditChatHead.next(!this.MemberEditChatHead.value);
  }
  openEditViewMember(){
    this.MemberEditChatHeadMember.next(!this.MemberEditChatHeadMember.value);
  }

  setEditMeber(value: boolean) {
    this.MemberEditChatHeadMember.next(value);
  }
  
  openProfileView(){
    this.MemberEditChatprofileView.next(!this.MemberEditChatprofileView.value);
  }

  //-----------------EditComponet-----------------//
  private openNewImageComponet: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  openNewImageComponetObservable$: Observable<boolean> = this.openNewImageComponet.asObservable();
  openAvatar() {
    this.openNewImageComponet.next(!this.openNewImageComponet.value);
  }







  //--------//
  private WhichEdit: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private WhichEdit2: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private checkDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);


  checkDisabledObservabl$: Observable<boolean> = this.checkDisabled.asObservable();
  WhichEditObservabl2$: Observable<boolean> = this.WhichEdit2.asObservable();
  WhichEditObservabl$: Observable<number> = this.WhichEdit.asObservable();
 
  

  async openChat(chatColl: string, accId: string) {
    debugger
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
      this.swichMobileChat();
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
    debugger
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
