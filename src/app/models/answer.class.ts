import { Message } from './message.class';
import { Reaction } from './reaction.class';

export class Answer extends Message {
  messageId: string;

  constructor(
    id: string,
    chatId: string, // Id von Chat oder Channel
    messageId: string, // Id von Nachricht
    messageFrom: string, // Account id
    dispatchedDate: number,
    message: string,
    reactions: Array<Reaction>,
    answerAmount: number,
    lastAnswer: number,
    isAnAnswer: boolean
  ) {
    super(
      id,
      chatId,
      messageFrom,
      dispatchedDate,
      message,
      reactions,
      answerAmount,
      lastAnswer,
      isAnAnswer
    ),
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
      answerAmount: this.answerAmount,
      lastAnswer: this.lastAnswer,
      isAnAnswer: this.isAnAnswer,
    };
  }
}
