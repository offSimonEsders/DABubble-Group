import { Message } from './message.class';

export class Account {
  public name!: string;
  public email!: string;
  public photoUrl!: string;
  public onlineStatus!: boolean;
  private id!: string;
  private chats!: Array<Message>;

  constructor(name: string, email: string, photoUrl: string, id: string) {
    (this.name = name),
      (this.email = email),
      (this.photoUrl = photoUrl),
      (this.onlineStatus = true);
    this.id = id;
    this.chats = [];
  }

  get accountId(): string {
    return this.id;
  }

  get privateChats(): Array<Message> {
    return this.chats;
  }
}
