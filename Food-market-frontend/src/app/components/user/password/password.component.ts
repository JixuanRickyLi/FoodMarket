import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {UserModel} from '../../../models/user.model';
import {ErrorModel} from '../../../models/error.model';
import {PasswordModel} from '../../../models/password.model';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  hide = true;
  user: UserModel;
  diff = false;
  errMsg: string;

  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  onSubmit(f: NgForm) {
    if (f.value.newPassword !== f.value.confirmNewPassword) {
      this.diff = true;
    } else {
      this.authService.changePassword(
        new PasswordModel(this.user.username, this.user.password, f.value.newPassword)
      ).subscribe(response => {
        if (response.status === 'success' ) {
          this.authService.user = response.data as UserModel;
          this.user = this.authService.user;
          this.authService.userChanged.next(this.user);
          this.router.navigate(['/']).then();
          this.snackBar.open('Your password has been changed', 'close', {
            duration: 2000,
          });
        } else {
          this.errMsg = (response.data as ErrorModel).errMsg;
        }
      });
    }
  }
}
