export const login = {
    type: 'LOG_IN'
};

export function logout(){
    localStorage.removeItem('id_token');
    return{
    type: 'LOG_OUT'
    }
};

export const toggleDrawer = {
    type: 'TOGGLE_DRAWER'
};

export function validateJWT(token){
    return function(dispatch){
        console.log('validateJWT: ' + token);
        dispatch(login);
    }
}