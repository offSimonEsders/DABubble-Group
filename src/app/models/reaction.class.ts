import { Account } from './accounts.class';

export class Reaction {
  public photoUrl!: string; // Url für Reaction Icon
  public reactors!: Array<Account>;

  constructor(url: string, reactors: Array<Account>) {
    this.photoUrl = url;
    this.reactors = reactors;
  }
}
