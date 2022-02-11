export const STATECHANGE = "statechange";
export const STATE_ARRAY_CHANGE = "StateArrayChange";
export const ASSESMENT_CLEARSTATE = "assesment_clearstate";
export const FETCH_DATA = "fectchData";
export const RECEIVED_DATA = "receivedData"; 
EXPOR case ASSESSMENT_ADD_INPUT:
if (action.payload.type === "medication") {
    return {
        ...state,
        medicationList: AddMedication(state.medicationList)
    }
} else {
    return {
        ...state,
        labsList: AddLabs(state.labsList)
    }
}
case ASSESSMENT_REMOVE_INPUT:
if (action.payload.type === "medication") {
    return {
        ...state,
        medicationList: RemoveMedication(state.medicationList)
    }
}
else {
    return {
        ...state,
        labsList: RemoveLabs(state.labsList)
    }
export