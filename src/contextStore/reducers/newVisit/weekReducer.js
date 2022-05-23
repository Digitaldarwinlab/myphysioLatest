import {
    WEEK_DAY
  } from "../../actions/newVisit/types";
  import moment from 'moment';


  let m = moment()
  let arr = []
  for(let i = 0; i <= 6 ; i++ ){

    let week =  m.startOf('week').add(i, "day").format("D")
    arr.push(week)
    
  }
  
  
  const initialState = arr



  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
       case WEEK_DAY:
        return payload.WeekData
        
   
      default:
        return state;
    }
  }