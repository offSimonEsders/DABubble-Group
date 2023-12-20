import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-create-channel',
  standalone: true,
  imports: [CommonModule,AddUserComponent],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.scss',
})
@Injectable({
  providedIn: 'root',
})
export class CreateChannelComponent {
  openCreate: boolean = false;
  whichCreate: number = 1;

  subscription: any;
  openCreate2!:boolean;
  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.subscription = this.chatService.channelCreated$.subscribe(
      state => this.openCreate = state
    );
  }

  close() {
    this.openCreate = false;
  }

  close2(){
    this.openCreate2 = false;
    this.whichCreate = 1;
  }

  nextpage(){
    this.whichCreate = 2;

    this.openCreate2 = true;
  }
}
