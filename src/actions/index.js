import axios from 'axios';
import settings from '../config';
import { push } from 'react-router-redux';
import actionTypes from './actionTypes';

export function login() {
    return {
        type: actionTypes.LOG_IN
    }
};

export function loginWithToken(id_token) {
    localStorage.setItem('id_token', id_token);
    return {
        type: actionTypes.LOG_IN
    }
};

export function loginWithPassword(email, password) {
    return function (dispatch) {

        axios.post(settings.serverUrl + '/api/post/signin', {
            email: email,
            password: password
        })
            .then(function (response) {
                // TODO: Redirect to create my first trip
                let id_token = response.data.token;
                if (id_token) {
                    localStorage.setItem('id_token', id_token);
                    dispatch(push('dashboard'));
                    dispatch(login());
                }
            })
            .catch(function (error) {
                // TODO: show error message and guide user to re submit
                console.error(error);
                dispatch(snackbarMessage('email or password incorrect'));
            });
    }

};


export function logout() {
    localStorage.removeItem('id_token');
    return {
        type: 'LOG_OUT'
    }
};

export const toggleDrawer = {
    type: 'TOGGLE_DRAWER'
};

export function validateJWT(token) {
    console.log('JWT: ' + localStorage.getItem('id_token'));
    console.log('validateJWT: ' + token);
    return function (dispatch) {
        dispatch(login());
    }
}

export const snackbarMessageOpen = {
    type: 'SNACKBAR_OPEN'
};

export function setSnackbarMessage(message){
    return{
        type: 'SET_SNACKBAR_MESSAGE',
        message: message
    }
};

export function snackbarMessage(message) {
    return function (dispatch) {
        dispatch(snackbarMessageOpen);
        dispatch(setSnackbarMessage(message));
    }
}