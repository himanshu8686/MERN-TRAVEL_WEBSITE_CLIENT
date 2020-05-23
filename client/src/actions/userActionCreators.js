import {
    GET_ERRORS,
    USER_SIGNUP,
    USER_LOGIN,
    USER_LOGOUT
} from './userActionsTypes';
import axios from 'axios';
import setAuthorizationToken from '../components/utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';


/**
 *  This Action Creator is responsible for registration of user 
 * @param {*} userSignUpData is basicaly the state of RegisterUser.js 
 * @param {*} history comes in the form of props here which in turn used for redirecting the page
 */
export const userSignUpRequest = (userSignUpData, history) => async dispatch => {
    try {
        const response = await axios.post("http://localhost:4000/api/users/register/", userSignUpData);
        //console.log("user reg res",response);
        history.push('/login');
        dispatch({
            type: USER_SIGNUP,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

/**
 *  This Action Creator is responsible for login of user 
 * @param {*} userLoginData is basicaly the state of LoginUser.js 
 * @param {*} history comes in the form of props here which in turn used for redirecting the page
 */
export const userLoginRequest = (userLoginData, history) => async dispatch => {
    try {
        const response = await axios.post("http://localhost:4000/api/users/login/", userLoginData);
        console.log("user login res", response);

        localStorage.setItem('token', `${response.data.token}`);
        localStorage.setItem('isAuthenticated', true);
        // setting in header
        const token = response.data.token;

        //setAuthorizationToken() method is setting auth token in header
        setAuthorizationToken(token);
        const decodedCurrentUser = jwt.decode(token);

        history.push('/dashboard')
        dispatch({
            type: USER_LOGIN,
            payload: response.data,
            currentUser: decodedCurrentUser
        });
    } catch (error) {
        console.log('error=>',error.response)
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

/**
 * userLogoutRequest method is clearing the token and is authenticated value from local storage 
 * @param {*} history comes in the form of props here which in turn used for redirecting the page
 */
export const userLogoutRequest = (history) => dispatch => {

    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated', true);
    setAuthorizationToken(false);
    history.push('/login');
    dispatch({
        type: USER_LOGOUT
    });
}
