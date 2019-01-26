import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromRoot from '../app.reducer';
import { UIService } from '../shared/ui.service';
import { Exercise } from './exercise.model';
import * as Training from './training.actions';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] =  [];
    private runningExercise: Exercise;
    private fbSubs: Subscription[] = [];
    userId = new Subject<string>();

    constructor(
        private afs: AngularFirestore,
        private store: Store<fromRoot.State>,
        private uiService: UIService) {}

    fetchAvailableExercises() {
        this.fbSubs.push(this.afs.collection('availableExercises').snapshotChanges().pipe(
            map(docArray => {
                return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                });
            })
        )
        .subscribe((exercises: Exercise[]) => {
            // this.availableExercises = exercises;
            // this.exercisesChanged.next([...this.availableExercises]);
            this.store.dispatch(new Training.SetAvailableTrainings(exercises));
        }, err => {
            this.uiService.showSnackbar('Fetching exercises failed, please try again later.', null, 3000);
        }));
    }

    startExercise(selectedId: string) {
        // this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        // this.exerciseChanged.next({...this.runningExercise});
        this.store.dispatch(new Training.StartTraining(selectedId));
    }

    completeExercise() {
        this.store.select(fromRoot.getActiveTraining).pipe(take(1))
            .subscribe(ex => {
                this.addDataToDatabase({...ex, date: new Date(), state: 'Completed'});
                this.store.dispatch(new Training.StopTraining());
            });
        // this.runningExercise = null;
        // this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.store.select(fromRoot.getActiveTraining).pipe(take(1))
            .subscribe(ex => {
                this.addDataToDatabase({
                    ...ex,
                    duration: ex.duration * (progress/100),
                    calories: ex.calories * (progress/100),
                    date: new Date(),
                    state: 'Cancelled'
                });
                this.store.dispatch(new Training.StopTraining());
            });
        // this.runningExercise = null;
        // this.exerciseChanged.next(null);
    }

    // getRunningExercise() {
    //     return {...this.runningExercise};
    // }

    fetchPastExercises() {
        this.fbSubs.push(this.afs.collection(`finishedExercises`).valueChanges()
            .subscribe((exercises: Exercise[]) => {
                // this.finishedExercisesChanged.next(exercises);
                this.store.dispatch(new Training.SetFinishedTrainings(exercises));
            }));
    }

    private addDataToDatabase(exercise: Exercise) {
        // this.userId.subscribe(user => {
            this.afs.collection(`finishedExercises`).add(exercise);
        // });
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }
}