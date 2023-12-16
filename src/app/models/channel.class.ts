import { Account } from './accounts.class';
import { Message } from './message.class';

export class Channel {
  public name: string;
  public description: string;
  public members: Array<Account>;
  public access: 'public' | 'private';
  public creater: string;
  public messages: Array<Message>;
  private id: string;

  constructor(
    name: string,
    description: string,
    members: Array<Account>,
    access: 'public' | 'private',
    creater: string,
    messages: Array<Message>,
    id: string
  ) {
    (this.name = name),
      (this.description = description),
      (this.members = members),
      (this.access = access),
      (this.creater = creater),
      (this.messages = messages),
      (this.id = id);
  }

  get channelId() {
    return this.id;
  }

  toJson() {
    return {
      name: this.name,
      description: this.description,
      members: this.members,
      access: this.access,
      creater: this.creater,
      messages: this.messages,
      id: this.id,
    };
  }
}
