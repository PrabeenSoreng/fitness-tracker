import { ActionReducerMap, createFeatureSelector, createSelector, createSelectorFactory } from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromTraining from './training/training.reducer';

export interface State {
    ui: fromUi.State;
    auth: fromAuth.State;
    training: fromTraining.State;
}

export const reducers: ActionReducerMap<State> = {
    ui: fromUi.uiReducer,
    auth: fromAuth.authReducer,
    training: fromTraining.trainingReducer
};

// createFeatureSelector function is used if you are targeting the state or the values returned by the sub reducer.
export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);

export const getTrainingState = createFeatureSelector<fromTraining.State>('training');
export const getAvailableExercises = createSelector(getTrainingState, fromTraining.getAvailableExercises);
export const getFinishedExercises = createSelector(getTrainingState, fromTraining.getFinishedExercises);
export const getActiveTraining = createSelector(getTrainingState, fromTraining.getActiveTraining);
export const getIsTraining = createSelector(getTrainingState, fromTraining.getIsTraining);