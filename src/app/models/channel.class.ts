import { Chat } from './chat.class';

export class Channel extends Chat {
  name: string;
  description: string;
  access: 'public' | 'private';
  creater: string;

  constructor(
    id: string,
    memberIds: Array<string>,
    name: string,
    description: string,
    access: 'public' | 'private',
    creater: string
  ) {
    super(id, memberIds),
      (this.name = name),
      (this.description = description),
      (this.access = access),
      (this.creater = creater);
  }

  override toJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      access: this.access,
      creater: this.creater,
      memberIds: this.memberIds,
    };
  }
}
