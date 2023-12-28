export class Reaction {
  reaction: string;
  reacting: string[];

  constructor(reaction: string, reacting: string[]) {
    (this.reaction = reaction), (this.reacting = reacting);
  }
}
