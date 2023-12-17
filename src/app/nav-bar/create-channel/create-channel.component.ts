import { Component, Injectable, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-channel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.scss',
})
@Injectable({
  providedIn: 'root',
})
export class CreateChannelComponent {
  openCreate: boolean = false;
  whichCreate: 1 | 2 = 1;
  @Input() emittedSignal!: any;

  open() {
    
    this.whichCreate = 1;
  }

  close() {
    this.emittedSignal = false;
  }
}
