import {
    FETCH_USER_LOGIN, FETCH_USERS,FETCH_DRIVERS
} from '../actions/UserstateActions';


// INITIALIZE STATE

const initialState = {
    login_status:false
};


// REDUCER

export const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER_LOGIN:
            return {
                ...state,
                login_status:action.payload
            };
        case FETCH_USERS:
            console.log(action)
            return {
                ...state,
                users:action.payload
            }
        case FETCH_DRIVERS:
            console.log(action)
            return {
                ...state,
                drivers:action.payload
            }
        default:
            return state;
    }
};