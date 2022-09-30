import React, { useState, lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Login from "./components/userAuth/Login.js";
// import Signup from "./components/userAuth/Signup.js";
import Roles from "./components/Role Management/Roles";
import RolesRegisteration from "./components/Role Management/AddRoles/RolesRegisteration";
const Login = lazy(() => import("./components/userAuth/Login.js"));
const Signup = lazy(() => import("./components/userAuth/Signup.js"));
const Assesment1 = lazy(() => import("./components/Assesment/Assesment1"));
const Assesment2 = lazy(() => import("./components/Assesment/AddQuestions"));
import SideNavBar from "./components/Layout/SideNavBar";
import Navigationbar from "./components/Layout/Navbar";
const Appointments = lazy(() =>
  import("./components/Scheduling/Appointments.js")
);
const Error404 = lazy(() => import("./components/Error/error404"));
const patients = lazy(() => import("./components/UI/Patients"));
const PhysioClinic = lazy(() =>
  import("./components/Physio/ClinicRegister/physioClinic")
);
const AddEpisode = lazy(() => import("./components/patientEpisode/AddEpisode"));
const Prescription = lazy(() =>
  import("./components/patientEpisode/Prescription/Prescription")
);
const PatientConsuntForm = lazy(() =>
  import("./components/patientEpisode/PatientConsuntForm")
);

import EpisodeVisitDetails from "./components/episode-visit-details";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PrivateRoute/PublicRoute";
const Careplan = lazy(() => import("./components/care-plan/carePlanIndex"));
const PatientCareplan = lazy(() =>
  import("./PatientComponents/Careplan/PatientCareplan")
);
const CareplanEnterprise = lazy(() =>
  import("./components/care-plan-enterprise/carePlanIndex")
);
import { isAuthenticated, getUserData } from "./API/userAuth/userAuth";
//const Loading = lazy(() => import("./components/UtilityComponents/Loading.js"));
import "./styles/App.css";
import "./styles/Layout/Navbar.css";
import "./temp.css";
const ActiveSearch = lazy(() =>
  import("./components/UtilityComponents/ActiveSearch.js")
);
const AI = lazy(() => import("./components/AI/AI.jsx"));
const VideoCallIndex = lazy(() =>
  import("./components/video-call-screens/video-call-index")
);
const PatientVideoCallIndex = lazy(() =>
  import("./PatientComponents/Patient-video-call/patient-video-con.js")
);
const Logout = lazy(() => import("./components/userAuth/Logout.js"));
import PatientRoute from "./components/PrivateRoute/PatientRoute";
const PatientDashboard = lazy(() =>
  import("./PatientComponents/patientDashboard")
);
const PatientSchedule = lazy(() =>
  import("./PatientComponents/PatientSchedule/PatSchedule")
);
const PatientVisit = lazy(() =>
  import("./PatientComponents/Visits/PatientVisit")
);
const PatientPrescription = lazy(() =>
  import("./PatientComponents/Prescription/PatientPrescription")
);
const ResetPassword = lazy(() => import("./components/userAuth/ResetPassword"));
const PatientAI = lazy(() => import("./PatientComponents/PatientAI/PatientAI"));
const PatientProfile = lazy(() =>
  import("./PatientComponents/PatientProfile/PatientProfile")
);
const PhysioList = lazy(() =>
  import("./components/Physio/PhysioList/PhysioList")
);
const PhysioIndex = lazy(() => import("./components/Physio/PhysioIndex"));
// import HomeDashboard from "./PatientComponents/HomeDashboard";
const HomeDashboard = lazy(() => import("./PatientComponents/HomeDashboard"));
const PatientIndex = lazy(() =>
  import("./components/PatientRegistration/PatientIndex")
);
const ListOfExercises = lazy(() =>
  import("./PatientComponents/ListOfExercise/ListOfExercises")
);
const ExerciseDetail = lazy(() =>
  import("./PatientComponents/PatientSchedule/ExerciseDetail.js")
);
const PatientProgress = lazy(() =>
  import("./PatientComponents/PatientSchedule/PatientProgress.js")
);
const Tempdashboard = lazy(() =>
  import("./PatientComponents/Tempdashboard.js")
);
const PainAssessment = lazy(() =>
  import("./components/Assesment/PainAssessment.jsx")
);
const SpecialTest = lazy(() =>
  import("./components/Assesment/SpecialTest.jsx")
);
const Invoice = lazy(() => import("./components/Invoice/Invoice"));

const PostTestClass = lazy(() =>
  import("./components/Assesment/PoseTestClass.jsx")
);
const EnterprisePatient = lazy(() =>
  import("./PatientEnterprice/EnterprisePatient.jsx")
);
const EnterprisePatient1 = lazy(() =>
  import("./PatientEnterprice/EnterprisePatient1.jsx")
);
const EnterprisePatient2 = lazy(() =>
  import("./PatientEnterprice/EnterprisePatient2.jsx")
);
const EnterprisePatient3 = lazy(() =>
  import("./PatientEnterprice/EnterprisePatient3.jsx")
);
const Body = lazy(() => import("./EnterpriseNew/human-body/Body"));
const Quiz = lazy(() => import("./EnterpriseNew/Quiz/Quiz"));
const Qa = lazy(() => import("./EnterpriseNew/QA/Qa"));
const Pose = lazy(() => import("./EnterpriseNew/Posture/PoseTestClass"));
const PostAssesment = lazy(() =>
  import("./EnterpriseNew/PostAssesment/PostAssesment")
);
const EnterpriseExerciseDetail = lazy(() =>
  import("./EnterpriseNew/PatientComponents/PatientSchedule/ExerciseDetail.js")
);
const EnterpriseAI = lazy(() =>
  import("./EnterpriseNew/PatientComponents/PatientAI/PatientAI")
);
const EnterpriseSchedule = lazy(() =>
  import("./EnterpriseNew/PatientComponents/PatientSchedule/PatSchedule")
);
const EnterpriseRoute = lazy(() =>
  import("./components/PrivateRoute/EnterpriseRoute.js")
);
const ConsultForm = lazy(() =>
  import("./EnterpriseNew/ConsultForm/ConsultForm")
);
const EnterpriseRegister = lazy(() =>
  import("./components/Enterprise/EnterpriseRegister.js")
);
const EmployeeRegister = lazy(() =>
  import("./components/Enterprise/EmpoyeeRegister.js")
);
const organizationList = lazy(() =>
  import("./components/Enterprise/OrganzationList.js")
);
const EmployeeList = lazy(() =>
  import("./components/Enterprise/EmployeeList.js")
);
const ViewClinic = lazy(() =>
  import("./components/Physio/ClinicRegister/ViewClinic")
);
const ClinicList = lazy(() =>
  import("./components/Physio/ClinicRegister/ClinicList.js")
);
const AromWithouthAi = lazy(() =>
  import("./components/Assesment/Arom-withouth-ai.js")
);
const Appointment = lazy(() =>
  import("./components/NewSchedule/Appointment.js")
);
const EmployeeLogin = lazy(() =>
  import("./components/userAuth/EmployeeLogin.js")
);
const EmployeeDashborad = lazy(() =>
  import("./components/Enterprise/EmployeeDashboard.js")
);
const ExerDetail = lazy(() =>
  import("./PatientComponents/PatientSchedule/ExerDetail.jsx")
);

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
// import CareplanEnterprise from './components/care-plan-enterprise/carePlanIndex'
// import { isAuthenticated, getUserData } from './API/userAuth/userAuth';
import Loading from "./components/UtilityComponents/Loading.js";
import PatientAiMain from "./PatientComponents/PatientAI/PatientAiMain";
import PhysioVideoCall from "./components/video-call-screens/PhysioVideoCall";
import PatientVideoCall from "./PatientComponents/Patient-video-call/PatientVideoCall";
import AddRoutes from "./components/Role Management/AddRoutes/AddRoutes";
// import "./styles/App.css";
// import "./styles/Layout/Navbar.css";
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
// import Invoice from "./components/Invoice/Invoice"

// import PostTestClass from "./components/Assesment/PoseTestClass.jsx";
// import EnterprisePatient from "./EnterpriseNew/PatientEnterprice/EnterprisePatient.jsx";
// import EnterprisePatient1 from "./PatientEnterprice/EnterprisePatient1.jsx";
// import EnterprisePatient2 from "./PatientEnterprice/EnterprisePatient2.jsx";
// import EnterprisePatient3 from "./PatientEnterprice/EnterprisePatient3.jsx";
// import Body from "./EnterpriseNew/human-body/Body";
// import Quiz from "./EnterpriseNew/Quiz/Quiz";
// import Qa from "./EnterpriseNew/QA/Qa"
// import Pose from "./EnterpriseNew/Posture/PoseTestClass";
// import PostAssesment from "./EnterpriseNew/PostAssesment/PostAssesment";
// import EnterpriseExerciseDetail from "./EnterpriseNew/PatientComponents/PatientSchedule/ExerciseDetail.js";
// import EnterpriseAI from './EnterpriseNew/PatientComponents/PatientAI/PatientAI';
// import EnterpriseSchedule from "./EnterpriseNew/PatientComponents/PatientSchedule/PatSchedule";
// import EnterpriseRoute from "./components/PrivateRoute/EnterpriseRoute.js";
// import ConsultForm from "./EnterpriseNew/ConsultForm/ConsultForm";
// import EnterpriseRegister from "./components/Enterprise/EnterpriseRegister.js";
// import EmployeeRegister from "./components/Enterprise/EmpoyeeRegister.js";
// import organizationList from "./components/Enterprise/OrganzationList.js";
// import EmployeeList from "./components/Enterprise/EmployeeList.js";
// import ViewClinic from "./components/Physio/ClinicRegister/ViewClinic.js";
// import ClinicList from "./components/Physio/ClinicRegister/ClinicList.js";
// import AromWithouthAi from "./components/Assesment/Arom-withouth-ai.js";
// import Appointment from "./components/NewSchedule/Appointment.js";
// import EmployeeLogin from "./components/userAuth/EmployeeLogin.js";
// import EmployeeDashborad from "./components/Enterprise/EmployeeDashboard.js";
// import ExerDetail from "./PatientComponents/PatientSchedule/ExerDetail.jsx";
import { GetRoutesList, GetRolesList } from "./API/Roles Mangement/Role";

const App = () => {
  const path = window.location.pathname;
  const [isSideNavbarCollpased, setIsSideNavbarCollapsed] = useState(false);
  const [sidebarshow, Setsidebarshow] = useState(true);
  const [routesPath, setRoutesPath] = useState(path);
  const [routeMapping, setRouteMapping] = useState([]);
  function getCurrentPath(curPath) {
    setRoutesPath(curPath);
  }

  function SideNavbarCollpased(params) {
    setIsSideNavbarCollapsed(!isSideNavbarCollpased);
  }
  useEffect(() => {
    if (isAuthenticated()) {
      let a = [
        process.env.REACT_APP_MAIN_JS_URL,
        "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js",
        "https://mozilla.github.io/pdf.js/build/pdf.js",
        "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
        "https://kit.fontawesome.com/1ee1e3b82c.js",
      ];
      a.map((i) => {
        var script = document.createElement("script");
        script.setAttribute("src", i);
        script.setAttribute("crossorigin", true);
        document.head.appendChild(script);
      });

      let b = [
        "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
        "//db.onlinewebfonts.com/c/4f3e552b377b6cedd155639fb9b44efd?family=LCD-bold",
      ];
      b.map((i) => {
        var link = document.createElement("link");
        link.setAttribute("href", i);
        link.setAttribute("rel", "stylesheet");
        document.head.appendChild(link);
      });
      const addRoutes = async () => {
        let roles = await GetRolesList();
        let routes = await GetRoutesList();
        let a = []
        roles.Roles.map(
          (i) =>
            i === getUserData() &&
            roles.data[i].map((v) => {
              routes.routes[v] !== undefined &&
              a.push({ path: v, component: routes.routes[v].Context_url });
            })
        );
        console.log(a)
        setRouteMapping(a)
      };
      addRoutes()
    }
  }, []);

  // 	if (process.env.REACT_APP_STAGE === 'PROD')
  //   console.log = function no_console() {};

  return (
    <React.Fragment>
      <Router>
        <Suspense fallback={<Loading />}>
          {isAuthenticated() && (
            <Navigationbar
              getCurrentPath={getCurrentPath}
              SideNavbarCollpased={SideNavbarCollpased}
              isSideNavbarCollpased={isSideNavbarCollpased}
            />
          )}
          <div className="padT-0">
            {isAuthenticated() &&
              (getUserData() === "admin" ||
                getUserData() === "physio" ||
                getUserData() === "HeadPhysio" ||
                getUserData() === "patient") && (
                <div
                  className={`${
                    isSideNavbarCollpased ? "" : "col-md-2"
                  } sideNavbar`}
                  style={{
                    width: isSideNavbarCollpased ? "120px" : "",
                    position: "relative",
                  }}
                >
                  {sidebarshow ? (
                    <SideNavBar
                      SideNavbarCollpased={SideNavbarCollpased}
                      isSideNavbarCollpased={isSideNavbarCollpased}
                      pathName={routesPath}
                      getCurrentPath={getCurrentPath}
                    />
                  ) : null}
                </div>
              )}
            <div
              className={
                isAuthenticated() &&
                (getUserData() === "admin" ||
                  getUserData() === "physio" ||
                  getUserData() === "HeadPhysio" ||
                  getUserData() === "patient") &&
                sidebarshow
                  ? `${
                      isSideNavbarCollpased && "col-md-10 col-lg-11 offset-1"
                    } px-1 main-content white-backgorund`
                  : "MainConatiner"
              }
              style={{
                marginLeft: isSideNavbarCollpased
                  ? ""
                  : isAuthenticated()
                  ? "250px"
                  : "",
              }}
            >
              <Switch>
                <PublicRoute exact path="/employee" component={EmployeeLogin} />
                <PublicRoute exact path="/change-password" component={Signup} />
                <PublicRoute exact path="/" component={Login} />

                <PublicRoute
                  exact
                  path="/password_reset/:token"
                  component={ResetPassword}
                />
                <PrivateRoute
                  exact
                  path="/dashboard"
                  component={EpisodeVisitDetails}
                />
                <PrivateRoute
                  exact
                  path="/enterprise/dashboard"
                  component={EmployeeDashborad}
                />

                <Route exact path="/logout" component={Logout} />
                {/* <PatientRoute exact path="/patient/dashboard" component={PatientDashboard} /> */}
                {/* <PatientRoute exact path="/patient/enterprise/dashboard" component={EnterprisePatient}  /> */}

                <PrivateRoute
                  exact
                  path="/physio:channel"
                  component={() => (
                    <PhysioVideoCall
                      SideNavbarCollpased={setIsSideNavbarCollapsed}
                      Setsidebarshow={Setsidebarshow}
                    />
                  )}
                />
                {/* <PublicRoute exact path='/patientcall' component={()=><PatientVideoCall Setsidebarshow={Setsidebarshow}  />} /> */}
                <Route
                  exact
                  path="/patient:channel"
                  component={() => (
                    <PatientVideoCall
                      SideNavbarCollpased={setIsSideNavbarCollapsed}
                      Setsidebarshow={Setsidebarshow}
                    />
                  )}
                />
                <Route exact path="*" component={Error404} />
                {routeMapping.length>0 && routeMapping.map(i=> <Route exact path={i.path} component={i.component.replaceAll('"','')} />)}

              </Switch>
            </div>
          </div>
        </Suspense>
      </Router>
    </React.Fragment>
  );
};

export default App;
