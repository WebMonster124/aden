import { combineReducers } from 'redux';

import { FetchZipCodesReducer } from './FetchZipCodesReducer';
import { UserReducer } from './useReducer'
export const AppReducer = combineReducers({
    zipCodes: FetchZipCodesReducer,
    userState:UserReducer
});