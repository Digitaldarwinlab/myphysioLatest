import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated, getUserData } from './../../API/userAuth/userAuth';

const EnterpriseeRoute = ({component: Component, ...rest}) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isAuthenticated()?(
                getUserData() === "enterprise_patient" || getUserData() === "employee" 
                ?<Component {...props} />
                :<Redirect to="/patient/enterprise/dashboard" />
                )
            : <Redirect to="/" />
        )} />
    );
};
export default EnterpriseeRoute;