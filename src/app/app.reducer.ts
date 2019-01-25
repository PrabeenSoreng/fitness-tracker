import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';

export interface State {
    ui: fromUi.State
}

export const reducers: ActionReducerMap<State> = {
    ui: fromUi.uiReducer
};

// createFeatureSelector function is used if you are targeting the state or the values returned by the sub reducer.
export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);