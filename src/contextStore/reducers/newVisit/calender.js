import { ADD_VISIT } from "../../actions/newVisit/types";
import moment from "moment";

const initialState = { data: { date: moment() } };
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_VISIT:
      return {
        ...state,
        data: payload.CalenderData,
      };

    default:
      return state;
  }
}
