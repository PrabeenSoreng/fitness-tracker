import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromRoot from '../app.reducer';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;
  exerciseSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private trainingService: TrainingService) { }

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromRoot.getIsTraining);
    // this.exerciseSubscription = this.trainingService.exerciseChanged
    //   .subscribe(exercise => {
    //     if(exercise) this.ongoingTraining = true;
    //     else this.ongoingTraining = false;
    //   });
  }

  // ngOnDestroy() {
  //   if(this.exerciseSubscription) this.exerciseSubscription.unsubscribe();
  // }
}
