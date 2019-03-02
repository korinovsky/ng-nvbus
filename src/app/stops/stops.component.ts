import { Component, OnInit } from '@angular/core';
import {StopService} from "../stop.service";
import {Stop} from "../Stop";

@Component({
  selector: 'div.stops',
  templateUrl: './stops.component.html',
  styleUrls: ['./stops.component.scss']
})
export class StopsComponent implements OnInit {
  public stops: Array<Stop>;

  constructor(private stopService: StopService) {
  }

  ngOnInit() {
    this.stops = this.stopService.getStops();
  }

}
