import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../services/account.service';
import { LoginModel } from '../models/LoginModel';
import { CaptainModel } from '../models/CaptainModel';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel: LoginModel = new LoginModel();

  @ViewChild('loginForm', { static: false }) loginForm: NgForm;

  constructor(
    private _accountService: AccountService,
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    if (this.loginForm) {
      this.loginForm.form.markAsPristine();
      this.loginForm.form.markAllAsTouched();
    }
  }

  login(): void {
    this._accountService.login(this.loginModel)
      .subscribe((result: CaptainModel) => {
        localStorage.setItem('name', result.name);
        this._authService.setLogStatus(true);

        this._router.navigate(['planets']);
      },
        () => {
          return Swal.fire({
            title: "Error!",
            text: "Incorrect credentials!",
            icon: "error"
          });
        });
  }
}
