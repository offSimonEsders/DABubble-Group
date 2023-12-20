import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent implements OnInit {
  accountService!: AccountService;
  @Input() accountId!: string;
  status!: string;
  photoUrl!: string;

  constructor() {
    this.accountService = inject(AccountService);
  }

  ngOnInit(): void {
    this.accountService.getAccountImage(this.accountId).then((url) => {
      this.photoUrl = url;
    });
    this.accountService.getAccountStatus(this.accountId).then((status) => {
      this.status = status;
    });
  }

  getStatusColor() {
    if (this.status === 'online') {
      return '#92c83e';
    } else {
      return '#686868';
    }
  }
}
