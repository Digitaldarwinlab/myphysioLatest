import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated, getUserData } from './../../API/userAuth/userAuth';
// import { useHistory } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {

    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isAuthenticated()?(
                (getUserData() === "admin" || getUserData() === "physio" || getUserData() === "HeadPhysio" )
                ?<Component {...props} />
                :(getUserData()==='enterprise_patient')?<Redirect to="/patient/enterprise/dashboard" />:<Redirect to="/patient/dashboard" />
                )
            : <Redirect to="/" />
        )} />
    );
};
export default PrivateRoute;