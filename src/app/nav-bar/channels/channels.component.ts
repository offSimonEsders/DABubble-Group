import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-channels',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss'
})
export class ChannelsComponent {
  changelName:string = 'EntwicklerteamertzuiwegfkuzegfukzgkZGFUZgefkeuzgZEGUZGEZGEZGFZ<GFKZUGSUZ<GFZGS<ZGFZSG<ZGFZUG';
  PersonlName:string = 'Frederick Beck (Du)';
  openCh:boolean = true;
  rotateCh:boolean = false;
  openPe:boolean = true;
  rotatePe:boolean = false;

  hideChannels(){
    this.openCh = !this.openCh;
    this.rotateCh = !this.rotateCh;
  }

  hidePersonal(){
    this.openPe = !this.openPe;
    this.rotatePe = !this.rotatePe;
  }
}
