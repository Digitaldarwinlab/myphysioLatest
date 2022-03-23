import React, { useState, lazy,Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/userAuth/Login.js";
import Signup from "./components/userAuth/Signup.js";

// const Login = lazy(() => import('./components/userAuth/Login.js'));
// const Signup = lazy(() => import('./components/userAuth/Signup.js'));
// const Assesment1 = lazy(() => import('./components/Assesment/Assesment1'));
// const Assesment2 = lazy(() => import('./components/Assesment/AddQuestions'));
// const SideNavBar = lazy(() => import('./components/Layout/SideNavBar'));
// const Navigationbar = lazy(() => import('./components/Layout/Navbar'));
// const Appointments = lazy(() => import('./components/Scheduling/Appointments.js'));
// const Error404 = lazy(() => import('./components/Error/error404'));
// const patients = lazy(() => import("./components/UI/Patients"));
// const PhysioClinic = lazy(() => import('./components/Physio/ClinicRegister/physioClinic'));
// const AddEpisode = lazy(() => import('./components/patientEpisode/AddEpisode'));
// const Prescription = lazy(() => import('./components/patientEpisode/Prescription/Prescription'));
// const PatientConsuntForm = lazy(() => import('./components/patientEpisode/PatientConsuntForm'));
// const EpisodeVisitDetails = lazy(() => import('./components/episode-visit-details'));
// const Careplan = lazy(() => import('./components/care-plan/carePlanIndex'));
// const AI = lazy(() => import('./components/AI/AI.jsx'));
// const ActiveSearch = lazy(() => import("./components/UtilityComponents/ActiveSearch.js"));
// const VideoCallIndex = lazy(() => import('./components/video-call-screens/video-call-index'));
// const PatientVideoCallIndex = lazy(() => import('./PatientComponents/Patient-video-call/patient-video-con.js'));
// const Logout = lazy(() => import('./components/userAuth/Logout.js'));
// const PatientDashboard = lazy(() => import('./PatientComponents/patientDashboard'));
// const PatientSchedule = lazy(() => import('./PatientComponents/PatientSchedule/PatSchedule'));
// const ResetPassword = lazy(() => import('./components/userAuth/ResetPassword'));
// const PatientAI = lazy(() => import('./PatientComponents/PatientAI/PatientAI'));
// const PatientProfile = lazy(() => import('./PatientComponents/PatientProfile/PatientProfile'));
// const PhysioList = lazy(() => import('./components/Physio/PhysioList/PhysioList'));
// const PhysioIndex = lazy(() => import('./components/Physio/PhysioIndex'));
// const PatientIndex = lazy(() => import('./components/PatientRegistration/PatientIndex'));
// const ListOfExercises = lazy(() => import('./PatientComponents/ListOfExercise/ListOfExercises'));
// const ExerciseDetail = lazy(() => import('./PatientComponents/PatientSchedule/ExerciseDetail.js'));
// const PatientProgress = lazy(() => import('./PatientComponents/PatientSchedule/PatientProgress.js'));
// const Tempdashboard = lazy(() => import('./PatientComponents/Tempdashboard.js'));
// const PainAssessment = lazy(() => import('./components/Assesment/PainAssessment.jsx'));
// const SpecialTest = lazy(() => import('./components/Assesment/SpecialTest.jsx'));
// const EnterprisePatient = lazy(() => import('./PatientEnterprice/EnterprisePatient.jsx'));
// const EnterprisePatient1 = lazy(() => import('./PatientEnterprice/EnterprisePatient1.jsx'));
// const EnterprisePatient2 = lazy(() => import('./PatientEnterprice/EnterprisePatient2.jsx'));
// const EnterprisePatient3 = lazy(() => import('./PatientEnterprice/EnterprisePatient3.jsx'));
// const PostTestClass = lazy(() => import("./components/Assesment/PoseTestClass.jsx"));
// const PrivateRoute = lazy(() => import('./components/PrivateRoute/PrivateRoute'));
// const PublicRoute = lazy(() => import('./components/PrivateRoute/PublicRoute'));
// const PatientRoute = lazy(() => import('./components/PrivateRoute/PatientRoute'));

// import Assesment1 from "./components/Assesment/Assesment1";
// import Assesment2 from "./components/Assesment/AddQuestions";
// import SideNavBar from './components/Layout/SideNavBar';
// import Navigationbar from "./components/Layout/Navbar";
// import Appointments from "./components/Scheduling/Appointments.js";
// import Error404 from "./components/Error/error404";
// import patients from "./components/UI/Patients";
// import PhysioClinic from './components/Physio/ClinicRegister/physioClinic';
// import AddEpisode from './components/patientEpisode/AddEpisode';
// import Prescription from './components/patientEpisode/Prescription/Prescription';
// import PatientConsuntForm from './components/patientEpisode/PatientConsuntForm';
// import EpisodeVisitDetails from './components/episode-visit-details';
// import PrivateRoute from './components/PrivateRoute/PrivateRoute';
// import PublicRoute from './components/PrivateRoute/PublicRoute';
// import Careplan from './components/care-plan/carePlanIndex';
import { isAuthenticated, getUserData } from './API/userAuth/userAuth';
import Loading from "./components/UtilityComponents/Loading.js";
import "./styles/App.css";
import "./styles/Layout/Navbar.css";
// import ActiveSearch from "./components/UtilityComponents/ActiveSearch.js";
// import AI from "./components/AI/AI.jsx";
// import VideoCallIndex from './components/video-call-screens/video-call-index';
// import PatientVideoCallIndex from "./PatientComponents/Patient-video-call/patient-video-con.js";
// import Logout from "./components/userAuth/Logout.js";
// import PatientRoute from './components/PrivateRoute/PatientRoute';
// import PatientDashboard from './PatientComponents/patientDashboard';
// import PatientSchedule from './PatientComponents/PatientSchedule/PatSchedule';
// import ResetPassword from './components/userAuth/ResetPassword';
// import PatientAI from './PatientComponents/PatientAI/PatientAI';
// import PatientProfile from './PatientComponents/PatientProfile/PatientProfile';
// import PhysioList from './components/Physio/PhysioList/PhysioList';
// import PhysioIndex from './components/Physio/PhysioIndex';
// import PatientIndex from './components/PatientRegistration/PatientIndex';
// import ListOfExercises from './PatientComponents/ListOfExercise/ListOfExercises';
// import ExerciseDetail from "./PatientComponents/PatientSchedule/ExerciseDetail.js";
// import PatientProgress from "./PatientComponents/PatientSchedule/PatientProgress.js";
// import Tempdashboard from "./PatientComponents/Tempdashboard.js";
// import PainAssessment from "./components/Assesment/PainAssessment.jsx";
// import SpecialTest from "./components/Assesment/SpecialTest.jsx";
// import EnterprisePatient from "./PatientEnterprice/EnterprisePatient.jsx";
// import EnterprisePatient1 from "./PatientEnterprice/EnterprisePatient1.jsx";
// import PoseTest from "./components/Assesment/PoseTest.jsx";
// import PostTestClass from "./components/Assesment/PoseTestClass.jsx";
// import EnterprisePatient2 from "./PatientEnterprice/EnterprisePatient2.jsx";
// import EnterprisePatient3 from "./PatientEnterprice/EnterprisePatient3.jsx";
const App = () => {
	const path = window.location.pathname;
	const [isSideNavbarCollpased, setIsSideNavbarCollapsed] = useState(false);
	const [sidebarshow, Setsidebarshow] = useState(true)
	const [routesPath, setRoutesPath] = useState(path);
	function getCurrentPath(curPath) {
		setRoutesPath(curPath);
	}

	function SideNavbarCollpased(params) {
		setIsSideNavbarCollapsed(!isSideNavbarCollpased);
	}

	if (process.env.REACT_APP_STAGE === 'PROD')
  console.log = function no_console() {};


	return (
		<React.Fragment>
			<Router>
				<Suspense fallback={<Loading />}>
				{isAuthenticated() && (<Navigationbar getCurrentPath={getCurrentPath} SideNavbarCollpased={SideNavbarCollpased} isSideNavbarCollpased={isSideNavbarCollpased} />)}
				<div className="padT-0">
					{(isAuthenticated() && (getUserData() === "admin" || getUserData() === "physio")) && (
						<div className={`${isSideNavbarCollpased ? '' : 'col-md-2'} sideNavbar position-fixed`}
							style={{ width: isSideNavbarCollpased ? "90px" : "" }}>
							{
								sidebarshow ? <SideNavBar
									SideNavbarCollpased={SideNavbarCollpased}
									isSideNavbarCollpased={isSideNavbarCollpased}
									pathName={routesPath}
									getCurrentPath={getCurrentPath} />
									:
									null

							}
						</div>)}
					<div className={
						(isAuthenticated() && (getUserData() === "admin" || getUserData() === "physio")) && sidebarshow
							? `${isSideNavbarCollpased ? 'col-md-10 col-lg-11 offset-1' : 'col-md-9 col-lg-10 offset-2'} px-1 main-content white-backgorund` : "MainConatiner"}>
						<Switch>
							<PublicRoute exact path="/change-password" component={Signup} />
							<PublicRoute exact path="/" component={Login} />
							<PublicRoute exact path="/password_reset/:token" component={ResetPassword} />
							<PrivateRoute exact path="/dashboard" component={EpisodeVisitDetails} />
							<PrivateRoute exact path="/pateints/new" component={PatientIndex} />
							<PrivateRoute exact path="/pateints/update" component={PatientIndex} />
							<PrivateRoute exact path="/pateints" component={patients} />
							<PrivateRoute exact path="/physio/register" component={PhysioIndex} />
							<PrivateRoute exact path="/physio/update" component={PhysioIndex} />
							<PrivateRoute exact path="/physio/clinic/register" component={PhysioClinic} />
							<PrivateRoute exact path="/physio/list" component={PhysioList} />

							<PrivateRoute exact path="/appointments" component={() => <Appointments />} />
							<PrivateRoute exact path="/appointments/new" component={() => <Appointments />} />

							<PrivateRoute exact path="/add-episode" component={AddEpisode} />
							<PrivateRoute exact path="/episode" component={EpisodeVisitDetails} />

							<PrivateRoute exact path="/visit" component={EpisodeVisitDetails} />

							<PrivateRoute exact path="/notes" component={Prescription} />

							<PrivateRoute exact path="/assessment/1" component={Assesment1} />
							<PrivateRoute exact path="/assesment/Questions" component={Assesment2} />
							<PrivateRoute exact path="/assesment/PainAssessment" component={PainAssessment} />
							<PrivateRoute exact path="/assesment/SpecialTest" component={SpecialTest} />
							<PrivateRoute exact path="/assesment/PoseTest" component={PostTestClass} />
							<PrivateRoute exact path="/assessment/AI" component={AI} />

							<PrivateRoute exact path="/ActiveSearch" component={ActiveSearch} />

							<PrivateRoute exact path="/setting" component={EpisodeVisitDetails} />

							<PrivateRoute exact path="/care-plan" component={Careplan} />

							<PrivateRoute exact path="/patient/consent-form" component={PatientConsuntForm} />
							<Route exact path="/logout" component={Logout} />
							<PatientRoute exact path="/patient/dashboard" component={PatientDashboard} />
							<PatientRoute exact path="/patient/enterprise/dashboard" component={EnterprisePatient} />
							<PatientRoute exact path="/patient/enterprise/dashboard/1" component={EnterprisePatient1} />
							<PatientRoute exact path="/patient/enterprise/dashboard/2" component={EnterprisePatient2} />
							<PatientRoute exact path="/patient/enterprise/dashboard/3" component={EnterprisePatient3} />
							<PatientRoute exact path="/patient/schedule" component={PatientSchedule} />
							<PatientRoute exact path="/patient/ai" forceRefresh={true} component={PatientAI} />
							<PatientRoute exact path="/patient/profile" component={PatientProfile} />
							<PatientRoute exact path="/patient/exercises" component={ListOfExercises} />
							<PatientRoute exact path="/patient/exercises/brief" forceRefresh={true} component={ExerciseDetail} />
							<PatientRoute exact path='/patient/progress' component={PatientProgress} />
							<PatientRoute exact path='/patient/update' component={PatientIndex} />
							<PatientRoute exact path='/patient/Temp' component={Tempdashboard} />
							{/* <Route exact path="/video-call/:channel" component={VideoCallIndex}/> */}
							<Route exact path="/physio:channel"
								render={(props) => <VideoCallIndex Setsidebarshow={Setsidebarshow} {...props} />} />
							<Route exact path="/patient:channel" component={PatientVideoCallIndex} />

							<Route exact path="*" component={Error404} />
						</Switch>
					</div>
				</div>
				</Suspense>
			</Router>
		</React.Fragment>
	);

}


export default App;