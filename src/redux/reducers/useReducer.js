import {
    FETCH_USER_LOGIN
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
        default:
            return state;
    }
};