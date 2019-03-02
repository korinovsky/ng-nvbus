import {Component, Input, OnInit} from '@angular/core';
import {Stop} from "../Stop";

@Component({
  selector: 'a.stop',
  templateUrl: './stop.component.html',
  styleUrls: ['./stop.component.scss']
})
export class StopComponent implements OnInit {
  private static numberOfArrivals = 10;
  private static secondsToShow = 60;


  private static getTimeFormatted(time: number): string {
    let hours = Math.floor(time / 3600);
    let minutes = (time - hours * 3600) / 60;
    return hours + ":" + (minutes < 10 ? "0" : "") + minutes;
  }

  @Input() public stop: Stop;
  public arrivals: Array<Arrival>;

  constructor() {
  }

  ngOnInit() {
    let now = new Date(),
      nowTime = now.getHours() * 3600 + now.getMinutes() * 60 - StopComponent.secondsToShow,
      dayOfWeek = now.getDay(),
      checkDate = function (date) {
        return parseInt(date, 2) & [1, 64, 32, 16, 8, 4, 2][dayOfWeek];
      };
    this.arrivals = [];

    if (now.getHours() < 4) {
      now.setDate(now.getDate() - 1);
    }


    for (let d in this.stop.days) {
      if (checkDate(this.stop.days[d].code)) {
        let future = false;
        for (let t in this.stop.days[d].times) {
            let time = this.stop.days[d].times[t].time;
            future = future || time >= nowTime;
            if (!future) {
              continue;
            }
            this.arrivals.push({
              time: StopComponent.getTimeFormatted(time),
              bus: this.stop.days[d].times[t].bus
            });
            if (this.arrivals.length == StopComponent.numberOfArrivals) {
              break;
            }
        }
        break;
      }
    }

    setTimeout(this.ngOnInit.bind(this), 60001 - now.getMilliseconds() - now.getSeconds() * 1000);

  }
}

interface Arrival {
  time: string;
  bus: string;
}
