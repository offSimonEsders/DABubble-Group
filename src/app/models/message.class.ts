import { Reaction } from './reaction.class';

export class Message {
  id: string;
  chatId: string; // Id von Chat oder Channel
  transmitter: string; // Absender Name
  photoUrl: string;
  transmittedDate: Date;
  message: string;
  reactions: Array<Reaction>;

  constructor(
    id: string,
    chatId: string,
    name: string,
    photoUrl: string,
    transmittedDate: Date,
    message: string
  ) {
    (this.id = id),
      (this.chatId = chatId),
      (this.transmitter = name),
      (this.photoUrl = photoUrl),
      (this.transmittedDate = transmittedDate),
      (this.message = message),
      (this.reactions = []);
  }

  toJson() {
    return {
      id: this.id,
      chatId: this.chatId,
      transmitter: this.transmitter,
      photoUrl: this.photoUrl,
      transmittedDate: this.transmittedDate,
      message: this.message,
      reactions: this.reactions,
    };
  }
}
