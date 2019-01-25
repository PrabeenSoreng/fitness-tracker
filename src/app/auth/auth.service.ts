import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import { UIService } from '../shared/ui.service';
import { TrainingService } from '../training/training.service';
import { AuthData } from './auth-data.model';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {
    // authChange = new Subject<boolean>();
    // private isAuthenticated = false;

    constructor(
        private trainingService: TrainingService,
        private uiService: UIService,
        private afAuth: AngularFireAuth,
        private store: Store<fromRoot.State>,
        private router: Router) {}

    initAuthListner() {
        this.afAuth.authState.subscribe(user => {
            if(user) {
                // this.isAuthenticated = true;
                // this.authChange.next(true);
                this.store.dispatch(new Auth.SetAuthenticated());
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.router.navigate(['/login']);
                this.store.dispatch(new Auth.SetUnauthenticated());
                // this.authChange.next(false);
                // this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                this.store.dispatch(new UI.StopLoading());
                // this.uiService.loadingStateChanged.next(false);
                // this.authSuccessfully();
            })
            .catch(err => {
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar(err.message, null, 3000);
            });
    }

    login(authData: AuthData) {
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.store.dispatch(new UI.StopLoading());
                // this.uiService.loadingStateChanged.next(false);
                // this.authSuccessfully();
            })
            .catch(err => {
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar(err.message, null, 3000);
            });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    // isAuth() {
    //     return this.isAuthenticated;
    // }

    // private authSuccessfully() {
    //     this.isAuthenticated = true;
    //     this.authChange.next(true);
    //     this.router.navigate(['/training']);
    // }
}