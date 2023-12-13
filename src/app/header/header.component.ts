import { Component, OnInit } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [AvatarComponent],
})
export class HeaderComponent implements OnInit {
  accountStatus!: string;
  accountName!: string;

  ngOnInit(): void {
    // Daten aus aktuellen Account filtern
    this.accountStatus = 'online';
    this.accountName = 'Frederik Beck';
  }
}
