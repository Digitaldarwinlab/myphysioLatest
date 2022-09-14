import { ADD_ROLE,ADD_ROLE_CLEAR_STATE } from "../actions/Roles";
// const RoleInitialState=

export const RoleReg = (state,action)=>{
    switch (action.type) {
        case ADD_ROLE:
            return {
                ...state,
                data:action.payload
            } 
        case ADD_ROLE_CLEAR_STATE:
            return {
                ...clinicInitialState
            }    
        default:
            return {
                ...state
            }
    }
}