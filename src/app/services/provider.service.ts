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
}
