import { combineReducers } from 'redux';
import authReducer from './auth';


export const rootReducer = combineReducers({
    authReducer: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
