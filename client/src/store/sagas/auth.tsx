import { call, delay, put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { getUserFromLocalStorageSuccess, logoutUserSuccess, signInWithUsernameFailed, signInWithUsernameStart, signInWithUsernameSuccess } from '../actions/auth';
import { userApi } from '../../api/user';
import { User } from '../../types';

function* signInUsernameSaga(action: ReturnType<typeof signInWithUsernameSuccess>) {
    yield put(signInWithUsernameStart());
    yield delay(500);
    try {
        const user: User = yield call(() => userApi.signinNewUser(action.payload));
        yield call([localStorage, 'setItem'], 'currentUser', JSON.stringify(user));
        yield put(signInWithUsernameSuccess(user));
    } catch (e) {
        yield put(signInWithUsernameFailed(e));
    }
}

function* logoutUserSaga() {
    yield call([localStorage, 'removeItem'], 'currentUser');
    yield delay(300);
    yield put(logoutUserSuccess());
}

function* getUserFromLocalStorageSaga() {
    const user = yield call([localStorage, 'getItem'], 'currentUser');
    yield put(getUserFromLocalStorageSuccess(JSON.parse(user)));
}


export default [
    takeEvery(actionTypes.SIGN_IN_USERNAME, signInUsernameSaga),
    takeEvery(actionTypes.LOGOUT_USER, logoutUserSaga),
    takeEvery(actionTypes.GET_USER_LOCAL_STORAGE, getUserFromLocalStorageSaga)

]
