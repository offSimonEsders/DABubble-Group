export class Chat {
  id: string;
  memberIds: Array<string>;

  constructor(id: string, memberIds: Array<string>) {
    this.id = id;
    this.memberIds = memberIds;
  }

  toJson() {
    return {
      id: this.id,
      memberIds: this.memberIds,
    };
  }
}
