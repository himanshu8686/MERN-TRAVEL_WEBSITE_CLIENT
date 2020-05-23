import axios from 'axios';

/**
 * This setAuthorizationToken function is responsible for set up the token in the header like
 * Authorization : Bearer dsahgdhjgfjhfdskja
 * @param {*} token is true then it is added in the header else if it is false then it will be deleted from header
 */
export default function setAuthorizationToken(token){
    if (token) {
        axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
    }
    else{
    delete axios.defaults.headers.common['Authorization'];
    }
}