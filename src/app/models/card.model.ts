export class CardModel {
  name: string;
  cost: number;
  days: number;
  costPerTicket: number;
  profit: number;

  constructor(name: string, days: number, cost: number, costPerTicket: number) {
    this.name = name;
    this.days = days;
    this.cost = cost;
    this.costPerTicket = costPerTicket;
  }
}
