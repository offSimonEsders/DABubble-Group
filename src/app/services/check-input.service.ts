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
    let regex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{8,}$/i;;
    return regex.test(password);
  }

}
