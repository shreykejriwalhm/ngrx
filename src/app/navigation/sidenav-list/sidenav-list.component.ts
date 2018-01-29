import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  subscription: Subscription;
  @Output() onCloseSideNav = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuth = this.authService.isAuth();

    this.subscription = this.authService.authChange
      .subscribe(isAuth => {
        this.isAuth = isAuth;
      })
  }

  closeSideNav() {
    this.onCloseSideNav.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
