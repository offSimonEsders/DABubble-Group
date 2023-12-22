import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChannelComponent } from '../create-channel.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit{
  choose:boolean = false;


  ngOnInit(): void {
    
  }

  toggleChoose(){
    this.choose = !this.choose;
  }

  Addpeople(){
    console.log('wert')
  }
}
