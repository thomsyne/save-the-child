import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  formatStartDate(date) {
    date = new Date(date);

    return new Date(new Date(Date.parse(date)).setHours(1, 0, 0))
      .toISOString()
      .split(".")[0]
      .toString();
  }

  formatEndDate(date) {
    date = new Date(date);
    return new Date(new Date(Date.parse(date)).setHours(24, 59, 59))
      .toISOString()
      .split(".")[0]
      .toString();
  }

  formatDate(date) {
    if (date !== "") {
      let d = new Date(date);

      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      let year = d.getFullYear();

      if (month.length < 2) {
        month = "0" + month;
      }
      if (day.length < 2) {
        day = "0" + day;
      }

      return [year, month, day].join("-");
    }
  }

  subtractDays(day: number) {
    const currentDate = new Date();
    return currentDate.setDate(currentDate.getDate() - day);
  }

}
