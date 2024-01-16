import { Injectable } from '@angular/core';
import { Constants } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanetDetailsModel } from '../models/PlanetDetailsModel';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  private _planetURL = Constants.PLANET_API_ENDPOINT;
  
  constructor(private _http: HttpClient) { }

  getPlanets(): Observable<PlanetDetailsModel[]> {
    return this._http.get<PlanetDetailsModel[]>(`${this._planetURL}`);
  }
}
