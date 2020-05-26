import React from 'react';
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom';

/**
 * This stateless component is responsible for the protection of the routes over the application
 * It takes component as a parameter and its rest variables 
 * if user is not authenticated it redirects to home route
 */
const Protected = ({component:Component, ...rest}) => {
    const isAuthenticated=localStorage.getItem('isAuthenticated');
    return (
        <Route
        {...rest}
        render={
            props => isAuthenticated ? (<Component {...props}/>):
            (<Redirect to={{pathname:"/"}}/>)
        }
        />
    );
};

export default Protected;