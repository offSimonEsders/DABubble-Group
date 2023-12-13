import { Account } from './accounts.class';
import { Message } from './message.class';

export class Channel {
  public name!: string;
  public description!: string;
  public members!: Array<Account>;
  public creater!: string;
  public messages!: Array<Message>;

  constructor(
    name: string,
    description: string,
    members: Array<Account>,
    creater: string
  ) {
    (this.name = name),
      (this.description = description),
      (this.members = members),
      (this.creater = creater);
    this.messages = [];
  }
}
