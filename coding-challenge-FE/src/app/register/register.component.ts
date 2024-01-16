import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterModel } from '../models/RegisterModel';
import { NgForm } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { CaptainModel } from '../models/CaptainModel';
import Swal, { SweetAlertIcon } from "sweetalert2";
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerModel: RegisterModel = new RegisterModel();
  confirmPassword: string;
  robotsString: string = "";

  @ViewChild('registerForm', { static: false }) registerForm: NgForm;

  constructor(
    private _accountService: AccountService,
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    if (this.registerForm) {
      this.registerForm.form.markAsPristine();
      this.registerForm.form.markAllAsTouched();
    }
  }

  register(): void | Promise<any> {
    if (!this._checkPasswords(this.registerModel.password)) {
      return Swal.fire({
        title: "Error!",
        text: "The passwords must be the same!",
        icon: "error"
      });
    }

    this.registerModel.robots = this._convertToArray();
    this._accountService.register(this.registerModel)
      .subscribe((result: CaptainModel) => {
        localStorage.setItem('name', result.name);
        this._authService.setLogStatus(true);
        
        this._router.navigate(['planets']);
      },
        () => {
          return Swal.fire({
            title: "Error!",
            text: "Username unavailable!",
            icon: "error"
          });
        });
  }

  private _checkPasswords(password: string): boolean {
    return this.confirmPassword == password;
  }

  private _convertToArray(): string[] {
    return this.robotsString.split(',').map(r => r.trim());
  }
}
