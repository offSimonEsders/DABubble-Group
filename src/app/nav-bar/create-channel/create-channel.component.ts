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
  whichCreate: 1 | 2 = 1;
  @Input() emittedSignal!: any;
  subscription: any;
  constructor(private chatService: ChatService) {}

  ngOnInit() {
    // Subscribe to changes
    this.subscription = this.chatService.channelCreated$.subscribe(
      state => this.openCreate = state
    );
  }

  open() {
    
    this.whichCreate = 1;
  }

  close() {
    this.openCreate = false;
  }
}
