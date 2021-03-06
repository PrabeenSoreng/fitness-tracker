import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { SharedModule } from '../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { TrainingComponent } from './training.component';


@NgModule({
    declarations: [
        TrainingComponent,
        NewTrainingComponent,
        CurrentTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent
    ],
    imports: [
        AngularFirestoreModule,
        SharedModule
    ],
    entryComponents: [
        StopTrainingComponent
      ]
})
export class TrainingModule {}