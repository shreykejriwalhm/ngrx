import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";

import { TrainingService } from "../training.service";
import { Exercise } from "../exercise.model";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-past-trainings",
  templateUrl: "./past-trainings.component.html",
  styleUrls: ["./past-trainings.component.css"]
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  subscription: Subscription;
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.trainingService.fetchFinishedExercises();
    this.subscription = this.trainingService.finishedExercisesChanged
      .subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises;
        this.dataSource.paginator = this.paginator;
      })

    // this.dataSource.data = this.trainingService.getPastExercises();
  }

  ngAfterViewInit() {
   this.dataSource.sort = this.sort; 
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
