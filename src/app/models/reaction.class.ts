export class Reaction {
  photoUrl: string; // Url für Reaction Icon
  reactorIds: Array<string>;

  constructor(url: string, reactors: Array<string>) {
    this.photoUrl = url;
    this.reactorIds = reactors;
  }
}
