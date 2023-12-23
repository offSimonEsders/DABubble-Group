import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChannelComponent } from '../create-channel.component';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit{
  choose:boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    
  }

  toggleChoose(){
    this.choose = !this.choose;
  }

  Addpeople(){
    if(!this.choose){
      this.chatService.incompleteCreateChannel.publicStatus = true;
    }else{
      this.chatService.incompleteCreateChannel.publicStatus = false;
    }
    console.log(this.chatService.incompleteCreateChannel);
  }
}
