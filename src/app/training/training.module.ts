import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { StopTrainingComponent } from "./current-training/stop-training.component";
import { TrainingRouteModule } from "./training-route-module";


@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent
    ],
    imports: [
        SharedModule,
        TrainingRouteModule
    ],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}