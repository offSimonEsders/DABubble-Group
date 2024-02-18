import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckInputService {

  constructor() { }

  isValidUseremail(email: string): boolean {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  isValidUserpassword(password: string): boolean {
    if (password.length < 4) {
      return false;
    }
    return true;
  }

}
