import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = new BehaviorSubject(false);
  _isAuthenticated$ = this.isAuthenticated.asObservable();
  
  constructor() { }
  
  getLogStatus(): Observable<boolean> {
    if (localStorage.getItem('name')){
      console.log("DA")
      this.setLogStatus(true);
    }
    else{
      console.log("NU")
      this.setLogStatus(false);
    }

    return this._isAuthenticated$;
  }

  setLogStatus(status: boolean) {
    this.isAuthenticated.next(status);
  }
}
