import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  subscription: Subscription;
  @Output() sidenavToggleClicked = new EventEmitter();
  constructor(private authservice:AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.authservice.isAuth();
    this.subscription = this.authservice.authChange
      .subscribe(authenticated => {
        this.isAuthenticated = authenticated;
      })
  }

  onSidenavToggle() {
    this.sidenavToggleClicked.emit();
  }

  onLogout() {
    this.authservice.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
