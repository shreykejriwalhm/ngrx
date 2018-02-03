import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { AuthService } from "../../auth/auth.service";
import * as fromRoot from "../../app.reducer";
import * as Auth from '../../auth/auth.actions';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  @Output() sidenavToggleClicked = new EventEmitter();
  constructor(
    private authservice: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuth);
  }

  onSidenavToggle() {
    this.sidenavToggleClicked.emit();
  }

  onLogout() {
    this.authservice.logout();
  }

}
