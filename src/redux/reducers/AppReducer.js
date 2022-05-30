import { combineReducers } from 'redux';

import { FetchZipCodesReducer } from './FetchZipCodesReducer';
import { UserReducer } from './useReducer'
import { BookingReducer } from './BookingReducer'
import { VehicleReducer }  from './vehicleReducer'
import {NotificationReducer} from './NotificationReducer'
export const AppReducer = combineReducers({
    zipCodes: FetchZipCodesReducer,
    userState:UserReducer,
    bookingState:BookingReducer,
    vehicleState:VehicleReducer,
    notification:NotificationReducer
});