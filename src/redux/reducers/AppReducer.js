import { combineReducers } from 'redux';

import { FetchZipCodesReducer } from './FetchZipCodesReducer';
import { UserReducer } from './useReducer'
import { BookingReducer } from './BookingReducer'
import { VehicleReducer }  from './vehicleReducer'
import {NotificationReducer} from './NotificationReducer'
import { PassengerInfoReducer } from './passengerReducer'
export const AppReducer = combineReducers({
    zipCodes: FetchZipCodesReducer,
    userState:UserReducer,
    bookingState:BookingReducer,
    vehicleState:VehicleReducer,
    notificationState:NotificationReducer,
    passengerState:PassengerInfoReducer
});