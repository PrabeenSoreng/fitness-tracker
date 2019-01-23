import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { TrainingService } from '../training/training.service';
import { AuthData } from './auth-data.model';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(
        private trainingService: TrainingService,
        private uiService: UIService,
        private afAuth: AngularFireAuth,
        private router: Router,
        private snackbar: MatSnackBar) {}

    initAuthListner() {
        this.afAuth.authState.subscribe(user => {
            if(user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                this.uiService.loadingStateChanged.next(false);
                // this.authSuccessfully();
            })
            .catch(err => {
                this.uiService.loadingStateChanged.next(false);
                this.snackbar.open(err.message, null, {duration: 3000});
            });
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.uiService.loadingStateChanged.next(false);
                // this.authSuccessfully();
            })
            .catch(err => {
                this.uiService.loadingStateChanged.next(false);
                this.snackbar.open(err.message, null, {duration: 3000});
            });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }

    // private authSuccessfully() {
    //     this.isAuthenticated = true;
    //     this.authChange.next(true);
    //     this.router.navigate(['/training']);
    // }
}