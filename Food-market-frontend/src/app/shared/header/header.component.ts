import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: UserModel;

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.authService.userChanged.subscribe(
      user => {
        this.user = user;
      }
    );
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  login() {
    this.router.navigate(['/login']).then();
  }

  home() {
    this.router.navigate(['']).then();
  }

  signup() {
    this.router.navigate(['/signup']).then();
  }

  profile() {
    this.router.navigate(['/profile']).then();
  }

  changePassword() {
    this.router.navigate(['/pwd']).then();
  }

  signOut() {
    this.authService.user = null;
    this.authService.userChanged.next(null);
    this.router.navigate(['']);
  }
}
