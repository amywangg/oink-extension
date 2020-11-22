import { AUTH, AUTH_SUCCESS, AUTH_FAILURE } from "./constants";
import { combineReducers } from "redux";

const initialState = {
  user: {},
  isSignedin: null,
};

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTH:
      const { user } = payload;
      return {
        ...state,
        user: user,
        isSignedin: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isSignedin: true,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        isSignedin: false,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  reducer: reducer,
});

export default rootReducer;
