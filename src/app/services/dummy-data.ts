import { Account } from '../models/account.class';
import { Channel } from '../models/channel.class';
import { Message } from '../models/message.class';
import { Reaction } from '../models/reaction.class';

let localStorage = { id: 'id1' };

let ddAccount: Account[] = [
  new Account(
    'Frederik Beck',
    'fred.beck@email.com',
    '../../assets/img/characters/frederik_beck.svg',
    'online',
    'id1'
  ),
  new Account(
    'Sofia Müller',
    'sofia.muel@beispiel.com',
    '../../assets/img/characters/sofia_müller.svg',
    'online',
    'id2'
  ),
  new Account(
    'Noah Braun',
    'noahbra@email.com',
    '../../assets/img/characters/noah_braun.svg',
    'offline',
    'id3'
  ),
  new Account(
    'Elise Roth',
    'rothelise@beispiel.com',
    '../../assets/img/characters/elise_roth.svg',
    'away',
    'id4'
  ),
  new Account(
    'Elias Neumann',
    'ichbinelias@beispiel.com',
    '../../assets/img/characters/elias_neumann.svg',
    'away',
    'id5'
  ),
  new Account(
    'Steffen Hoffmann',
    'thehoffman@beispiel.com',
    '../../assets/img/characters/steffen_hoffmann.svg',
    'offline',
    'id6'
  ),
];

let ddChannels: Channel[] = [
  new Channel(
    'channelId1',
    ['id1', 'id2', 'id3'],
    'Entwicklerteam',
    'Dieser Channel ist für alles rund um #dfsdf vorgesehen. Hier kannst du zusammen mit deinem Team Meetings abhalten, Dokumente teilen und Entscheidungen treffen',
    'public',
    'Noah Braun'
  ),
];

let ddMessages: Message[] = [
  new Message(
    'messageId1',
    'channelId1',
    'Noah Braun',
    '../../assets/img/characters/noah_braun.svg',
    new Date('Jan 14 2023 14:25:00 GMT+0200'),
    'Welche Version ist aktuell von Angular?',
    []
  ),
  new Message(
    'messageId2',
    'channelId1',
    'Frederik Beck',
    '../../assets/img/characters/frederik_beck.svg',
    new Date(),
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam explicabo eligendi porro quam expedita eveniet, voluptate iure illum aliquid a laboriosam quidem blanditiis hic sed numquam, vitae accusantium. Ullam, quo.',
    [
      new Reaction('../../assets/img/reactions/check.png', 'Sophia Müller'),
      new Reaction('../../assets/img/reactions/rocket.png', 'Sophia Müller'),
    ]
  ),
];

let ddAnswers: Message[] = [
  new Message(
    'answerId1',
    'messageId1',
    'Sofia Müller',
    '../../assets/img/characters/sofia_müller.svg',
    new Date('Jan 14 2023 14:30:00 GMT+0200'),
    'Ich habe die gleiche Frage. Ich habe gegoogelt und es scheint, dass die aktuelle Version Angular 13 ist. Vielleicht weiß Frederik, ob es wahr ist.',
    [new Reaction('../../assets/img/reactions/nerd.png', 'Noah Braun')]
  ),
  new Message(
    'answerId2',
    'messageId1',
    'Frederik Beck',
    '../../assets/img/characters/frederik_beck.svg',
    new Date('Jan 14 2023 14:56:00 GMT+0200'),
    'Ja das ist es.',
    [new Reaction('../../assets/img/reactions/handsUp.png', 'Sophia Müller')]
  ),
];
