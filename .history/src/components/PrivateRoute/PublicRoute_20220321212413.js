import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated, getUserData } from './../../API/userAuth/userAuth';
// import { useHistory } from 'react-router-dom';

const PublicRoute = ({component: Component, ...rest}) => {
    // const history = useHistory();
    // const sendToDashboard = () => {
    //     history.push("/dashboard");
    // }
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isAuthenticated()?
                (getUserData() === "admin" || getUserData() === "physio")
                ?<Redirect to="/dashboard" />
                :(get)<Redirect to="/patient/dashboard" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;