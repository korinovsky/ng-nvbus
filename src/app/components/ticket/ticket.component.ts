import {Component, OnInit} from '@angular/core';
import {HolidayService} from "../../services/holiday.service";
import moment, {Moment} from "moment";
import {CardModel} from "../../models/card.model";
import {Optional} from "typescript-optional";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  buyDate: Moment;
  ticketsPerDay: number;
  startDate: Moment;
  endDate: Moment;
  dataSource: CardModel[];
  displayedColumns: string[] = ['name', 'cost', 'days', 'costPerTicket', 'profit'];
  private cardDays = 30;
  private cardTickets = 60;
  private costCardTickets = 1900;
  private costCardDays = 2170;

  constructor(private holidayService: HolidayService, private cookieService: CookieService) {
  }

  ngOnInit() {

    const buyDateDefault = moment().startOf('day');
    this.buyDate = Optional.ofNullable(this.cookieService.get('buyDate'))
      .filter(value => value.length > 0)
      .map(value => moment(value))
      .orElse(buyDateDefault);
    if (this.buyDate.isBefore(buyDateDefault)) {
      this.buyDate = buyDateDefault;
    }
    this.ticketsPerDay = Optional.ofNullable(this.cookieService.get('ticketsPerDay'))
      .filter(value => value.length > 0)
      .map(value => parseInt(value))
      .orElse(4);
    this.startDate = Optional.ofNullable(this.cookieService.get('startDate'))
      .filter(value => value.length > 0)
      .map(value => moment(value))
      .orNull();
    this.endDate = Optional.ofNullable(this.cookieService.get('endDate'))
      .filter(value => value.length > 0)
      .map(value => moment(value))
      .orNull();
    this.calculateCost();
  }

  calculateCost() {
    this.saveField('buyDate');
    this.saveField('startDate');
    this.saveField('endDate');
    this.saveField('ticketsPerDay');

    if (!this.buyDate) return;

    let workDays = this.holidayService.workDays(this.buyDate, this.cardDays, this.startDate, this.endDate);

    this.dataSource = [
      new CardModel(
        `Единый на ${this.cardDays} дней`,
        workDays,
        this.costCardDays,
        this.costCardDays / workDays / this.ticketsPerDay),
      new CardModel(
        `Единый на ${this.cardTickets} поездок`,
        this.cardTickets / this.ticketsPerDay,
        this.costCardTickets,
        this.costCardTickets / this.cardTickets),
    ];
    const costDiff = this.costDiff(this.dataSource[0], this.dataSource[1]);
    if (costDiff > 0) {
      this.dataSource[0].profit = costDiff;
    } else if (costDiff < 0) {
      this.dataSource[1].profit = -costDiff;
    }
  }

  private saveField(field: string) {
    Optional.ofNullable(this[field]).ifPresentOrElse(value => {
        if (moment.isMoment(value)) {
          this.cookieService.set(field, (<Moment>value).format("YYYY-MM-DD"));
        } else if (value === "") {
          this.cookieService.delete(field)
        } else {
          this.cookieService.set(field, value.toString(10));
        }
      },
      () => this.cookieService.delete(field));
  }

  private costDiff(cardDays: CardModel, cardTickets: CardModel) {
    return cardTickets.cost - cardDays.cost
      + (cardDays.days - cardTickets.days) * cardTickets.costPerTicket * this.ticketsPerDay
  }
}
