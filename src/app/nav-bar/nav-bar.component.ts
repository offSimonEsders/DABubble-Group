import { Component } from '@angular/core';
import { NavHeadComponent } from './nav-head/nav-head.component';
import { ChannelsComponent } from './channels/channels.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { ProfileViewComponent } from '../profile-view/profile-view.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NavHeadComponent, ChannelsComponent, CreateChannelComponent,ProfileViewComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
}
