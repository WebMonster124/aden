
export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_DRIVERS = 'FETCH_DRIVERS';
export function fetchUserLogin(status= true) {
    return {
        type: FETCH_USER_LOGIN,
        payload: status
    }
};
export function fetchUsets(users){
    return{
        type:FETCH_USERS,
        payload:users
    }
}
export function fetchdrivers(drivers){
    return{
        type:FETCH_DRIVERS,
        payload:drivers
    }
}

