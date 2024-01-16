import { Component, OnInit } from '@angular/core';
import { PlanetService } from '../services/planet.service';
import { PlanetDetailsModel } from '../models/PlanetDetailsModel';
import { ColorConstants } from '../constants/color-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {
  planets: PlanetDetailsModel[] = [];

  constructor(
    private _planetService: PlanetService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('name')) {
      this._getPlanets();
    }
    else {
      this._router.navigate(['register']);
    }
  }

  private _getPlanets(): void {
    this._planetService.getPlanets()
      .subscribe((result: PlanetDetailsModel[]) => {
        this.planets = result;
      })
  }

  getStatusColor(status: string): string {
    switch(status) {
      case("OK"): 
        return ColorConstants.GREEN;
      case("!OK"):
        return ColorConstants.RED;
      case("En route"):
        return ColorConstants.GRAY;
      default:
        return ColorConstants.BLUE;
    }
  }
}
