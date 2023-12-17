import { Component, Injectable, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-create-channel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.scss',
})
@Injectable({
  providedIn: 'root',
})
export class CreateChannelComponent {
  openCreate: boolean = false;
  whichCreate: number = 1;
  choose:boolean = false
  @Input() emittedSignal!: any;
  subscription: any;
  constructor(private chatService: ChatService) {}

  ngOnInit() {
    // Subscribe to changes
    this.subscription = this.chatService.channelCreated$.subscribe(
      state => this.openCreate = state
    );
  }

  toggleChoose(){
    this.choose = !this.choose;
  }

  close() {
    this.openCreate = false;
  }

  nextpage(){
    this.whichCreate = 2;
    console.log(this.choose, this.openCreate, this.whichCreate);
  }
}
