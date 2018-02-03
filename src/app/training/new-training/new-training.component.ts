import { Component, OnInit } from "@angular/core";

import { TrainingService } from "../training.service";
import { Exercise } from "../exercise.model";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs";

import { Store } from "@ngrx/store";
import * as fromApp from "../../app.reducer";
import * as fromTraining from '../training.reducer';

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.trainingService.fetchAvailableExercises();
    this.isLoading$ = this.store.select(fromApp.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableTrainings);
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
