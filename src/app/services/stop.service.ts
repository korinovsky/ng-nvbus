import {Injectable} from '@angular/core';
import json from '../data/stops.json';
import {BusTime, DayOfWeek, StopModel} from "../models/stop.model";

@Injectable({
  providedIn: 'root'
})
export class StopService {

  private stops: Array<StopModel> = new Array<StopModel>();

  constructor() {
    Object.keys(json).forEach((stopName) => {
      let stop = new StopModel();
      stop.name = stopName;
      stop.days = new Array<DayOfWeek>();
      this.pushDayOfWeek(stop, stopName);
      this.stops.push(stop);
    });
  }

  private pushDayOfWeek(stop, stopName) {
    Object.keys(json[stopName]).forEach((daysCode) => {
      let day = new DayOfWeek();
      stop.days.push(day);
      day.code = daysCode;
      day.times = new Array<BusTime>();
      this.pushBusStop(day, stopName, daysCode);
    });
  }

  private pushBusStop(day, stopName, daysCode) {
    json[stopName][daysCode].forEach((elem) => {
      let time = new BusTime();
      day.times.push(time);
      time.time = elem.time;
      time.bus = elem.way;
    });
  }

  getStops() {
    return this.stops;
  }
}
