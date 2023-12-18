import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DatePipe } from './date.pipe';

@Component({
  selector: 'app-time-separator',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './time-separator.component.html',
  styleUrl: './time-separator.component.scss',
})
export class TimeSeparatorComponent {
  @Input() date!: Date;
}
