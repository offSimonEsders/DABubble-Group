import { Reaction } from './reaction.class';

export class Message {
  transmitter!: string; // Absender Name
  photoUrl!: string;
  transmittedDate!: Date;
  message!: string;
  answers!: Array<Message>;
  reactions!: Array<Reaction>;

  constructor(
    name: string,
    photoUrl: string,
    transmittedDate: Date,
    message: string
  ) {
    (this.transmitter = name),
      (this.photoUrl = photoUrl),
      (this.transmittedDate = transmittedDate),
      (this.message = message),
      (this.answers = []),
      (this.reactions = []);
  }
}
