import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  choose:boolean = false;
  openCreate2!:boolean;
  whichCreate: number = 1;

  toggleChoose(){
    this.choose = !this.choose;
  }

  close2(){
    this.openCreate2 = false;
    this.whichCreate = 1;
  }
}
