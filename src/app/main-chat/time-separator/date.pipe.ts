import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
  standalone: true,
})
export class DatePipe implements PipeTransform {
  transform(value: Date) {
    let today = new Date();
    let toFormat = new Date(value);

    if (this.checkIfToday(today, toFormat)) {
      return 'Heute';
    }

    if (this.checkIfYesterday(today, toFormat)) {
      return 'Gestern';
    } else {
      return this.formatDate(toFormat);
    }
  }

  checkIfToday(today: Date, toFormat: Date) {
    today.setHours(0, 0, 0, 0);
    toFormat.setHours(0, 0, 0, 0);
    return today.getTime() === toFormat.getTime();
  }

  checkIfYesterday(today: Date, toFormat: Date) {
    today.setHours(0, 0, 0, 0);
    toFormat.setHours(0, 0, 0, 0);
    const timeDifference = today.getTime() - toFormat.getTime();
    return timeDifference === 24 * 60 * 60 * 1000;
  }

  formatDate(formatDate: Date) {
    const weekDay = formatDate.toLocaleString('de-DE', {
      weekday: 'long',
    });
    const day = formatDate.toLocaleString('de-DE', {
      day: 'numeric',
    });
    const month = formatDate.toLocaleString('de-DE', {
      month: 'long',
    });

    return `${weekDay}, ${day} ${month}`;
  }
}
