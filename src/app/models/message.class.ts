import { Reaction } from './reaction.class';

export class Message {
  id: string;
  chatId: string; // Id von Chat oder Channel
  messageFrom: string; // Account id
  dispatchedDate: number; // Absendedatum als Timestamp
  message: string;
  reactions: Array<Reaction>;
  answerAmount: number;
  lastAnswer: number;

  constructor(
    id: string,
    chatId: string,
    messageFrom: string,
    dispatchedDate: number,
    message: string,
    reactions: Array<Reaction>,
    answerAmount: number,
    lastAnswer: number
  ) {
    (this.id = id),
      (this.chatId = chatId),
      (this.messageFrom = messageFrom),
      (this.dispatchedDate = dispatchedDate),
      (this.message = message),
      (this.reactions = reactions),
      (this.answerAmount = answerAmount),
      (this.lastAnswer = lastAnswer);
  }

  toJson() {
    return {
      id: this.id,
      chatId: this.chatId,
      messageFrom: this.messageFrom,
      dispatchedDate: this.dispatchedDate,
      message: this.message,
      reactions: this.reactions,
      answerAmount: this.answerAmount,
      lastAnswer: this.lastAnswer,
    };
  }
}
