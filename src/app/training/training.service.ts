import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { map } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs";
import { Exercise } from "./exercise.model";

@Injectable()
export class TrainingService {
  private availableExercises: Exercise[] = [];

  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  fetchAvailableExercises() {
    this.fbSubs.push(this.db
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
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      }));
  }

  fetchFinishedExercises() {
    this.fbSubs.push(this.db
      .collection("finishedExercises")
      .valueChanges() // gives only value not id
      // .snapshotChanges()
      .subscribe((exercises: Exercise[]) => {
        console.log(exercises);
        this.finishedExercisesChanged.next(exercises);
      }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: "completed"
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress) {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: "cancelled",
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100)
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  addDataToDatabase(exercise: Exercise) {
    this.db.collection("finishedExercises").add(exercise);
  }

  constructor(private db: AngularFirestore) {}
}
