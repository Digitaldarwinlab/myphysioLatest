import { ADD_SEARCH,ADD_SEARCH_CLEAR_STATE } from "../actions/Search";
// const SEARCHInitialState=
const usersDefaultState = []
export const SearchReg = (state=usersDefaultState,action)=>{
    switch (action.type) {
        case ADD_SEARCH:
            return {
                ...state,
                data:action.payload
            } 
        case ADD_SEARCH_CLEAR_STATE:
            return {
                ...usersDefaultState
            }    
        default:
            return {
                ...state
            }
    }
}