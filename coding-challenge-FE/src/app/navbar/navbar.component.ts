import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title: string = "XPAND";
  isAuth: boolean = false;
  private _unsubscribe = new Subject<void>();

  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this._authService.getLogStatus()
    .pipe(takeUntil(this._unsubscribe))
    .subscribe((subject) =>{
      this.isAuth = subject;
    })
  }

  goToLogin(): void {
    this._router.navigate(['login']);
  }
  
  goToRegister(): void {
    this._router.navigate(['register']);
  }

  goToLogout(): void {
    localStorage.removeItem('name');
    this._authService.setLogStatus(false);

    this._router.navigate(['']);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
