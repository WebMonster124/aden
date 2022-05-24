
export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';

export function fetchUserLogin(status= true) {
    return {
        type: FETCH_USER_LOGIN,
        payload: status
    }
};

