export class Reaction {
  photoUrl: string; // Url für Reaction Icon
  reactor: string;

  constructor(url: string, reactor: string) {
    this.photoUrl = url;
    this.reactor = reactor;
  }
}
