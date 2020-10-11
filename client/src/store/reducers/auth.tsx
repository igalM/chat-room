import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { AuthActions } from '../actions/auth';
import { User } from '../../types';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: '',
}

const authReducer = (state = initialState, action: AuthActions) => {
    switch (action.type) {
        case actionTypes.SIGN_IN_USERNAME_START:
            return signInWithUsernameStartHelper(state);
        case actionTypes.SIGN_IN_USERNAME_SUCCESS:
            return signInWithUsernameSuccessHelper(state, action.payload);
        case actionTypes.SIGN_IN_USERNAME_FAILED:
            return signInWithUsernameFailedHelper(state, action.payload);
        case actionTypes.LOGOUT_USER_SUCCESS:
            return logoutUserSuccessHelper(state);
        case actionTypes.GET_USER_LOCAL_STORAGE_SUCCESS:
            return getUserFromLocalStorageHelper(state, action.payload);
        case actionTypes.CLOSE_SNACKBAR:
            return closeSnackbarHelper(state);
        case actionTypes.FILE_VALIDATION_ERROR:
            return fileValidationHelper(state);
        default:
            return state;
    }
}

const signInWithUsernameStartHelper = (state: AuthState): AuthState => {
    return updateObject(state, { loading: true });
}

const signInWithUsernameSuccessHelper = (state: AuthState, payload: User): AuthState => {
    return updateObject(state, { user: payload, loading: false, error: '' });
}

const signInWithUsernameFailedHelper = (state: AuthState, payload: string): AuthState => {
    return updateObject(state, { loading: false, error: payload });
}

const logoutUserSuccessHelper = (state: AuthState): AuthState => {
    return updateObject(state, { user: null });
}

const getUserFromLocalStorageHelper = (state: AuthState, payload: User | null): AuthState => {
    return updateObject(state, { user: payload });
}

const fileValidationHelper = (state: AuthState): AuthState => {
    return updateObject(state, { error: 'Only JPG/PNG files under 4MB allowed.' });
}

const closeSnackbarHelper = (state: AuthState): AuthState => {
    return updateObject(state, { error: '' });
}

export default authReducer;
