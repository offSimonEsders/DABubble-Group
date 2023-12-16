import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChannelComponent } from '../create-channel/create-channel.component';
import { AvatarComponent } from '../../avatar/avatar.component';

@Component({
  selector: 'app-channels',
  standalone: true,
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss',
  imports: [CommonModule, CreateChannelComponent, AvatarComponent],
})
export class ChannelsComponent {
  changelName: string =
    'EntwicklerteamertzuiwegfkuzegfukzgkZGFUZgefkeuzgZEGUZGEZGEZGFZ<GFKZUGSUZ<GFZGS<ZGFZSG<ZGFZUG';
  PersonlName: string = 'Frederick Beck (Du)';
  openCh: boolean = true;
  rotateCh: boolean = false;
  openPe: boolean = true;
  rotatePe: boolean = false;
  @Output() serverCreated = new EventEmitter<boolean>();

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
    this.serverCreated.emit(true);
  }
}
