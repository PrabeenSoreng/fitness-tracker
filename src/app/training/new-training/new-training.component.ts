import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  exerciseSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingService.fetchAvailableExercises();
    this.exercises$ = this.store.select(fromRoot.getAvailableExercises);
  //   this.exerciseSubscription = this.trainingService.exercisesChanged
  //     .subscribe(exercises => this.exercises = exercises);
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  // ngOnDestroy() {
  //   if(this.exerciseSubscription) this.exerciseSubscription.unsubscribe();
  // }
}
