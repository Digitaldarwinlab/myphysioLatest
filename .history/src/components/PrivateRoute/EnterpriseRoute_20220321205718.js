import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated, getUserData } from './../../API/userAuth/userAuth';

const PatientRoute = ({component: Component, ...rest}) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isAuthenticated() ?
                (getUserData() === "e" || getUserData() === "physio")
                ?<Redirect to="/dashboard" />
                :(<Component {...props} />)
            : <Redirect to="/" />
        )} />
    );
};
export default PatientRoute;