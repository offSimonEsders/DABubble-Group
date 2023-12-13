import { Component } from '@angular/core';
import { NavHeadComponent } from './nav-head/nav-head.component';
import { ChannelsComponent } from './channels/channels.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NavHeadComponent,ChannelsComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

}
