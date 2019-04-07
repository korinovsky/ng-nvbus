import {Injectable} from '@angular/core';
import stops from '../data/stops';
import {BusTime, DayOfWeek, StopModel} from "../models/stop.model";

@Injectable()
export class StopService {

  private stops: Array<StopModel> = new Array<StopModel>();

  constructor() {
    Object.keys(stops).forEach((stopName) => {
      let stop = new StopModel();
      stop.name = stopName;
      stop.days = new Array<DayOfWeek>();
      this.pushDayOfWeek(stop, stopName);
      this.stops.push(stop);
    });
  }

  private pushDayOfWeek(stop, stopName) {
    Object.keys(stops[stopName]).forEach((daysCode) => {
      let day = new DayOfWeek();
      stop.days.push(day);
      day.code = daysCode;
      day.times = new Array<BusTime>();
      this.pushBusStop(day, stopName, daysCode);
    });
  }

  private pushBusStop(day, stopName, daysCode) {
    stops[stopName][daysCode].forEach((elem) => {
      let time = new BusTime();
      day.times.push(time);
      time.time = elem.time;
      time.bus = elem.way;
    });
  }

  getStops() {
    return this.stops;
  }

  getStop(name: string) {
    return this.stops.find(stop => stop.name === name);
  }
}
