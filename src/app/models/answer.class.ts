import { Message } from './message.class';
import { Reaction } from './reaction.class';

export class answer extends Message {
  messageId: string;

  constructor(
    id: string,
    chatId: string, // Id von Chat oder Channel
    messageId: string, // Id von Nachricht
    messageFrom: string, // Account id
    dispatchedDate: number,
    message: string,
    reactions: Array<Reaction>
  ) {
    super(id, chatId, messageFrom, dispatchedDate, message, reactions),
      (this.messageId = messageId);
  }

  override toJson() {
    return {
      id: this.id,
      chatId: this.chatId,
      messageId: this.messageId,
      messageFrom: this.messageFrom,
      dispatchedDate: this.dispatchedDate,
      message: this.message,
      reactions: this.reactions,
    };
  }
}