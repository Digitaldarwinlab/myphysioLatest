import {
    
    CHANGE_MONTH,MONTH_VAL
  } from "../actions/types";
  import moment from 'moment';
  
  const initialState = {data:moment()};
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
       case CHANGE_MONTH:
         console.log(payload)
        return {
          ...state,
          data: payload.MonthData,
        };
       case MONTH_VAL:
        console.log(payload)
        return {
          ...state,
          data: payload.MonthVal,
        };
   
      default:
        return state;
    }
  }