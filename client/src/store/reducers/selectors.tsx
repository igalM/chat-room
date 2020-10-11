import { RootState } from './index';
import { createSelector } from 'reselect';

export const selectCurrentUser = (state: RootState) => state.authReducer.user;
export const selectSignInLoading = (state: RootState) => state.authReducer.loading;
export const selectSignInError = (state: RootState) => state.authReducer.error;

export const userExists = createSelector(
    selectCurrentUser, currentUser => {
        return currentUser !== null;
    }
)