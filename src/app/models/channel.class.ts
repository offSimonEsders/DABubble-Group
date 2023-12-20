import { Chat } from './chat.class';

export class Channel extends Chat {
  name: string;
  description: string;
  publicStatus: boolean;
  creater: string; // User name

  constructor(
    id: string,
    memberIds: Array<string>,
    name: string,
    description: string,
    publicStatus: boolean,
    creater: string
  ) {
    super(id, memberIds),
      (this.name = name),
      (this.description = description),
      (this.publicStatus = publicStatus),
      (this.creater = creater);
  }

  override toJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      publicStatus: this.publicStatus,
      creater: this.creater,
      memberIds: this.memberIds,
    };
  }
}
