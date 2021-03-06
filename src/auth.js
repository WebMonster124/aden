
export const AUTH_TOKEN_KEY = 'authToken';
export const AUTH_USER_KEY = 'authUser';

export const ORGANIZATION_ID = 1

export const login = data => {
    localStorage.setItem(AUTH_TOKEN_KEY, data.accessToken);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(
        {
            name:data.username,
            email:data.email,
            roles:data.roles,
            address:data.address,
            postcode:data.postcode,
            country:data.country
        }
    ));
}

export const logout = (e) => {
    // alert("Hello")
    if( window.confirm( 'Are you sure to log out?') )    {
        flushUserSession();
        window.location = '/';
    }
}

export const flushUserSession = () => {
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
}

export const isAuthenticated = () => {
    // flushUserSession();
    if (localStorage.getItem(AUTH_TOKEN_KEY)) {
        // console.log(getAuthUser())
        return true;
    }
    return false;
}

export const isVerified = () => {
    var authUser = getAuthUser();
    if ( authUser ) {
        return authUser.email_verified_at !== null;
    }
    return false;
}

export const getToken = () => {
   return localStorage.getItem(AUTH_TOKEN_KEY);
}

export const getBearer = () => {
    // console.log(getAuthUser())
    const AuthToken = getToken();
    // console.log(AuthToken)
    return AuthToken ? AuthToken : null
}

export const getAuthUser = () => {
    try {
        const authUser = JSON.parse(localStorage.getItem(AUTH_USER_KEY))
        return authUser
    } catch (e) {
        return null;
    }
}

export const getOrganization = () => {
    //get from AuthUser TODO
    return {
        id: 1,
        name: 'First Organization'
    }
}

export const getAuthUserFullname = () => {
    const user = getAuthUser();
    // console.log(isVerified())
    if( user ) return `${user.first_name} ${user.last_name}`
}

export const asyncLocalStorage = {
    setItem: async function (key, value) {
        await null;
        return localStorage.setItem(key, value);
    },
    getItem: async function (key) {
        await null;
        return localStorage.getItem(key);
    }
};