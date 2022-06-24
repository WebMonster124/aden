import {
    NEW_NOTIFICATION, ADD_NOTIFICATION,SELECT_NOTIFICATION,TEMP_NOTIFICATION,UPDATE_NOTIFICATION,DELETE_NOTIFICATION
} from '../actions/NotificationstateActions';


const initialState = {
    notification:[],
};


// REDUCER

export const NotificationReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_NOTIFICATION:
            return {
                ...state,
                notification:action.payload
            };
        case SELECT_NOTIFICATION:
            console.log(action)
            return {
                ...state,
                notification:action.payload
            }
        case UPDATE_NOTIFICATION:
            console.log(action)
            return {
                ...state,
                notification:action.payload
            }
        case DELETE_NOTIFICATION:
            console.log(action)
            return {
                ...state,
                notification:action.payload
            }
        case TEMP_NOTIFICATION:
            return {
                ...state,
                temp_notification:action.payload
            }
        case NEW_NOTIFICATION:
            console.log(action.payload)
            return {
                ...state,
                newMessage:action.payload
            }
        default:
            return state;
    }
};