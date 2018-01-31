import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";

import { UserModel } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs/Subject";
import { TrainingService } from "../training/training.service";

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  public authChange = new Subject<boolean>();
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (user) {
        this.authChange.next(true);
        this.router.navigate(["/training"]);
        this.isAuthenticated = true;
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(["/login"]);
      }
    });
  }

  registerUser(authData: AuthData) {
    const { email, password } = authData;
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {})
      .catch(error => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {})
      .catch(error => {});
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
