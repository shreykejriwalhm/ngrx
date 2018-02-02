import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  subscription: Subscription;
  ongoingTraining = false;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.subscription = this.trainingService.exerciseChanged
      .subscribe(exercise => {
        if(exercise) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      })
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
