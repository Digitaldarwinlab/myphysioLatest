import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated, getUserData } from './../../API/userAuth/userAuth';
// import { useHistory } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {

    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isAuthenticated()?(
                (getUserData() === "admin" || getUserData() === "physio")
                ?<Component {...props} />
                :<Redirect to="/patient/enterpise/dashboard" />
                )
            : <Redirect to="/" />
        )} />
    );
};
export default PrivateRoute;