import {
    ADD_BOOKING,SELECT_BOOKING,TEMP_BOOKING
} from '../actions/BookingstateActions';


const initialState = {
    booking:[],
    temp_booking:[]
};


// REDUCER

export const BookingReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_BOOKING:
            return {
                ...state,
                booking:action.payload
            };
        case SELECT_BOOKING:
            console.log(action)
            return {
                ...state,
                booking:action.payload
            }
        case TEMP_BOOKING:
            console.log('ddddd',action.payload)
            return {
                ...state,
                temp_booking:action.payload
            }
        default:
            return state;
    }
};