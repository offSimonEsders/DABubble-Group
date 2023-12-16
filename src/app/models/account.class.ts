export class Account {
  name: string;
  email: string;
  photoUrl: string;
  onlineStatus: 'online' | 'away' | 'offline';
  chatIds: Array<string>;
  private id: string; // Primary key, References UID

  constructor(
    name: string,
    email: string,
    photoUrl: string,
    onlineStatus: 'online' | 'away' | 'offline',
    chatIds: Array<string>,
    id: string
  ) {
    (this.name = name),
      (this.email = email),
      (this.photoUrl = photoUrl),
      (this.onlineStatus = onlineStatus),
      (this.chatIds = chatIds),
      (this.id = id);
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
      chatIds: this.chatIds,
      id: this.accountId,
    };
  }
}
