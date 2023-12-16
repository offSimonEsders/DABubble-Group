import { Component, Injectable, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-create-channel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.scss'
})
@Injectable({
  providedIn: 'root',
})
export class CreateChannelComponent {
  openCreate:boolean = false;
  whichCreate: 1 | 2 = 1;
  openEditChannel = inject(ChatService);
  inputOpen:boolean = false;

  open(){
    this.inputOpen = this.openEditChannel.openEditChannel;
    this.whichCreate = 1;
    this.openCreate = this.inputOpen;
  } 
  
  close(){
    this.openCreate = false;
  }

}
