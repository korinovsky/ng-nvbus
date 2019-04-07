import {Component, OnInit} from '@angular/core';
import {StopService} from "../../services/stop.service";
import {StopModel} from "../../models/stop.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stops',
  templateUrl: './stops.component.html',
  styleUrls: ['./stops.component.scss']
})
export class StopsComponent implements OnInit {
  public stops: Array<StopModel>;

  constructor(private stopService: StopService,
              private router: Router) {
  }

  ngOnInit() {
    this.stops = this.stopService.getStops();
  }

  stopClicked(stop: StopModel) {
    this.router.navigate(['/', stop.name])
  }
}
