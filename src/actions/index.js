import axios from 'axios';
import settings from '../config';
import { push } from 'react-router-redux';
import {LOG_IN, LOG_OUT, TOGGLE_DRAWER, SNACKBAR_OPEN, SET_SNACKBAR_MESSAGE, UPDATE_SELECTED_TRIP} from './actionTypes';

export function loginWithToken(id_token) {
    localStorage.setItem('id_token', id_token);
    return {
        type: LOG_IN
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
                    // localStorage.setItem('id_token', id_token);
                    dispatch(loginWithToken(id_token));
                    dispatch(push('dashboard'));
                    
                }
            })
            .catch(function (error) {
                // TODO: show error message and guide user to re submit
                console.error(error);
                dispatch(snackbarMessage('email or password incorrect'));
            });
    }
};

export function updateSelectedTrip(tripId) {
    if(!localStorage.getItem){
        return function(dispatch){
            dispatch(snackbarMessage('Please Login First'));
            dispatch(logout);
        }
    }
    return function (dispatch) {
        axios({
            method: 'GET',
            url: settings.serverUrl + '/api/get/trip',
            json: true,
            headers: {
                'x-access-token': localStorage.getItem('id_token'),
            },
            params: {
                tripId: tripId
              }
        })
            .then(function (response) {
                // TODO: Redirect to create my first trip
                console.log(response.data);
            })
            .catch(function (error) {
                // TODO: show error message and guide user to re submit
                console.error(error);
            });
    }
};

export function logout() {
    localStorage.removeItem('id_token');
    return {
        type: LOG_OUT
    }
};

export const toggleDrawer = {
    type: TOGGLE_DRAWER
};

export function validateJWT(id_token) {
    // TODO ajax call required
    console.log('validateJWT: ' + id_token);
    return function (dispatch) {
        dispatch(loginWithToken(id_token));
    }
}

export const snackbarMessageOpen = {
    type: SNACKBAR_OPEN
};

export function setSnackbarMessage(message){
    return{
        type: SET_SNACKBAR_MESSAGE,
        message: message
    }
};

export function snackbarMessage(message) {
    return function (dispatch) {
        dispatch(snackbarMessageOpen);
        dispatch(setSnackbarMessage(message));
    }
}