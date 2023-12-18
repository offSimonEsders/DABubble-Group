export class Account {
  name: string;
  email: string;
  photoUrl: string;
  onlineStatus: 'online' | 'away' | 'offline';
  private id: string; // Primary key, References UID

  constructor(
    name: string,
    email: string,
    photoUrl: string,
    onlineStatus: 'online' | 'away' | 'offline',
    id: string
  ) {
    (this.name = name),
      (this.email = email),
      (this.photoUrl = photoUrl),
      (this.onlineStatus = onlineStatus),
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
      id: this.id,
    };
  }
}
