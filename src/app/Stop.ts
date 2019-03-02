export class BusTime {
  time: number;
  bus: string;
}

export class DayOfWeek {
  code: string;
  times: Array<BusTime>;
}

export class Stop {
  name: string;
  days: Array<DayOfWeek>;
}
