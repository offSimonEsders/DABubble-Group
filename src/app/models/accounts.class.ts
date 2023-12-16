export class Account {
  public name: string;
  public email: string;
  public photoUrl: string;
  public onlineStatus: 'online' | 'away' | 'offline';
  private id: string; // Id of the user
  public chatIds: Array<string>;

  constructor(
    name: string,
    email: string,
    photoUrl: string,
    onlineStatus: 'online' | 'away' | 'offline',
    id: string,
    chatIds: Array<string>
  ) {
    (this.name = name),
      (this.email = email),
      (this.photoUrl = photoUrl),
      (this.onlineStatus = onlineStatus),
      (this.id = id),
      (this.chatIds = chatIds);
  }

  get accountId(): string {
    return this.id;
  }

  toJson() {
    return {
      name: this.name,
      email: this.email,
      photoUrl: this.photoUrl,
      onlineStatus: this.onlineStatus,
      id: this.id,
      chatIds: this.chatIds,
    };
  }
}
