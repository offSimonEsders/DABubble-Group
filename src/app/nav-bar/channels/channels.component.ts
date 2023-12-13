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
  open:boolean = true;

  hideChannels(){
    this.open = !this.open;
  }
}
