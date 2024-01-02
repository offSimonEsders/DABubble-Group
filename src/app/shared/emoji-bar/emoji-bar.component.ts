import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ReactionService } from '../../services/reaction.service';
import { Message } from '../../models/message.class';

@Component({
  selector: 'app-emoji-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emoji-bar.component.html',
  styleUrl: './emoji-bar.component.scss',
})
export class EmojiBarComponent {
  reactions = ['rocket', 'check', 'nerd', 'handsUp'];
  reactionService!: ReactionService;
  @Input() message!: Message;
  @Input() collection!: string;
  @Input() ownMessage!: boolean;
  @Output() emojibarEmitter = new EventEmitter<void>();

  constructor() {
    this.reactionService = inject(ReactionService);
  }

  addReaction(reaction: string) {
    this.reactionService.addReaction(reaction, this.message, this.collection);
    this.emojibarEmitter.emit();
  }
}
