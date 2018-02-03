import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Observable } from "rxjs/Observable";

import { Store } from "@ngrx/store";
import * as fromRoot from '../../app.reducer';
import * as Auth from '../../auth/auth.actions';

@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.css"]
})
export class SidenavListComponent implements OnInit {
  isAuth$: Observable<boolean>;
  @Output() onCloseSideNav = new EventEmitter();

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  closeSideNav() {
    this.onCloseSideNav.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onCloseSideNav.emit();
  }
}
