import { Injectable } from '@angular/core';
import { Constants } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/LoginModel';
import { CaptainModel } from '../models/CaptainModel';
import { RegisterModel } from '../models/RegisterModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _accountURL = Constants.ACCOUNT_API_ENDPOINT;
  
  constructor(private _http: HttpClient) { }

  login(loginModel: LoginModel): Observable<CaptainModel> {
    return this._http.post<CaptainModel>(`${this._accountURL}/login`, loginModel);
  }

  register(registerModel: RegisterModel): Observable<CaptainModel> {
    return this._http.post<CaptainModel>(`${this._accountURL}/register`, registerModel);
  }
}
