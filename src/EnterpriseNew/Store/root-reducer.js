import { combineReducers } from "redux";
import jointReducer from "./joint-reducer";
import questionAnswerReducer from "./question-reducer";
import { carePlanRedcucer } from "./care-plan-reducers/care-plan-reducer";
import { signupReducer } from "./auth/authReducer";
import {loginReducer,Validation} from "./auth/authReducer";
import {episodeReducer} from "./Episode/addEpisode"
import { labsAndMedicRedu } from "./Episode/addLabsMedication";
import {patCurrentEpisode} from "./reducers/PatientSchedule/PateintSchedule";
import {scheduleReducer} from "./reducers/Scheduling/scheduleReducer";
import {physioRegisterReducer} from "./reducers/Physio/regiReducer";
import {FirstAssesment} from "./reducers/Assesment/Assesment1";
// import {jointsKeyReducer} from "./reducers/Assesment/Joint-keys"



const rootReducer = combineReducers({jointReducer,FirstAssesment,physioRegisterReducer,questionAnswerReducer,carePlanRedcucer,signupReducer,Validation,loginReducer,scheduleReducer,episodeReducer,labsAndMedicRedu,patCurrentEpisode});

export default rootReducer;