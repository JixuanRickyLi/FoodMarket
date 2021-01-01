import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../../models/user.model';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgForm} from '@angular/forms';
import {ErrorModel} from '../../../models/error.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserModel;
  errMsg: string;

  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  onSubmit(f: NgForm) {
    this.user.name = f.value.name;
    this.user.email = f.value.email;
    this.user.tel = f.value.phone;
    this.user.address = f.value.address;
    this.authService.changeInfo(this.user).subscribe(response => {
      if (response.status === 'success' ) {
        this.authService.user = response.data as UserModel;
        this.user = this.authService.user;
        this.authService.userChanged.next(this.user);
        this.snackBar.open('Your profile is Updated!', 'done', {
          duration: 4000,
        });
      } else {
        this.errMsg = (response.data as ErrorModel).errMsg;
      }
    });
  }
}
