import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChannelComponent } from '../create-channel/create-channel.component';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-channels',
  standalone: true,
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss',
  imports: [CommonModule, CreateChannelComponent],
})
export class ChannelsComponent {
  changelName: string =
    'EntwicklerteamertzuiwegfkuzegfukzgkZGFUZgefkeuzgZEGUZGEZGEZGFZ<GFKZUGSUZ<GFZGS<ZGFZSG<ZGFZUG';
  PersonlName: string = 'Frederick Beck (Du)';
  openCh: boolean = true;
  rotateCh: boolean = false;
  openPe: boolean = true;
  rotatePe: boolean = false;
  openEdit = inject(ChatService);

  constructor(private ChannelEdit: CreateChannelComponent) {}

  hideChannels() {
    this.openCh = !this.openCh;
    this.rotateCh = !this.rotateCh;
  }

  hidePersonal() {
    this.openPe = !this.openPe;
    this.rotatePe = !this.rotatePe;
  }

  openNewChannelDiv() {
    this.openEdit.openEditChannel.next(true);
    this.ChannelEdit.open();
  }
}
