import { Injectable } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
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
    this.homehideBar.next(!this.homehideBar);
  }


  openEditView(){
    this.openEditHeadChat.next(!this.openEditHeadChat);
  }


  openEditViewMemberEdit(){
    this.MemberEditChatHead.next(!this.MemberEditChatHead);
  }
  openEditViewMember(){
    this.MemberEditChatHeadMember.next(!this.MemberEditChatHeadMember);
  }

  setEditMeber(value: boolean) {
    this.MemberEditChatHeadMember.next(value);
  }
  
  openProfileView(){
    this.MemberEditChatprofileView.next(!this.MemberEditChatprofileView);
  }
}
