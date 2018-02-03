import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { map } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs";
import { Exercise } from "./exercise.model";
import { Store } from "@ngrx/store";
import * as fromTraining from "./training.reducer";
import * as UI from "../shared/ui.actions";
import * as Training from "./training.actions";
import { take } from "rxjs/operators";

@Injectable()
export class TrainingService {
  private availableExercises: Exercise[] = [];

  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private store: Store<fromTraining.State>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(
      this.db
        .collection("availableExercises")
        // .valueChanges(); // gives only value not id
        .snapshotChanges()
        .map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              calories: doc.payload.doc.data().calories,
              duration: doc.payload.doc.data().duration
            };
          });
        })
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new UI.StopLoading());

          this.store.dispatch(new Training.SetAvailableTrainings(exercises));
        })
    );
  }

  fetchFinishedExercises() {
    this.fbSubs.push(
      this.db
        .collection("finishedExercises")
        .valueChanges() // gives only value not id
        // .snapshotChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Training.SetFinishedTrainings(exercises));
        })
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: "completed"
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  cancelExercise(progress) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: "cancelled",
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100)
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  addDataToDatabase(exercise: Exercise) {
    this.db.collection("finishedExercises").add(exercise);
  }
}
