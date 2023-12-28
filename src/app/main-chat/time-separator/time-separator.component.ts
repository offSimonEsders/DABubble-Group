import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from './date.pipe';

@Component({
  selector: 'app-time-separator',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './time-separator.component.html',
  styleUrl: './time-separator.component.scss',
})
export class TimeSeparatorComponent implements OnInit {
  @Input() dispatchedDate!: number;
  date!: Date;

  ngOnInit(): void {
    this.date = new Date(this.dispatchedDate);
  }
}
