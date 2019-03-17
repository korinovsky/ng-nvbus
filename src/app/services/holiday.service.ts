import {Injectable} from '@angular/core';
import moment, {Moment} from "moment";
import {HolidayModel} from "../models/holiday.model";

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  workDays(buyDate: moment.Moment, days: number, startDate?: Moment, endDate?: Moment) {
    let date = buyDate.clone();
    let workDays = 0;
    for (let i = 0; i < days; i++) {
      workDays += +(this.isWorkDay(date) && !this.isRest(date, startDate, endDate));
      date.add(1, 'days');
    }
    return workDays;
  }

  private holidays: HolidayModel[] = [
    {date: moment("5/1/2019"), holiday: true},
    {date: moment("5/2/2019"), holiday: true},
    {date: moment("5/3/2019"), holiday: true},
    {date: moment("5/9/2019"), holiday: true},
    {date: moment("5/10/2019"), holiday: true},
    {date: moment("6/12/2019"), holiday: true},
    {date: moment("11/4/2019"), holiday: true},
  ];

  private isWorkDay(date: Moment): boolean {
    const holiday = this.holidays.find(value => value.date.isSame(date));
    if (holiday) return !holiday.holiday;
    return [1, 2, 3, 4, 5].includes(date.isoWeekday());
  }

  private isRest(date: Moment, startDate?: Moment, endDate?: Moment) {
    if (startDate) {
      if (endDate) {
        return date.isBetween(startDate, endDate, null, '[]');
      }
      return date.isSameOrAfter(startDate);
    } else if (endDate) {
      return date.isSameOrBefore(endDate);
    }
    return false;
  }
}
