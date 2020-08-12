import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import { v4 as uuidv4 } from "uuid";
import AlertReducer from "./alertReducer";

import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
  const initialState = []; //array of alert objs with type and message

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //Actions
  //Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuidv4(); //id of the alert
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  //remove alert
  const removeAlert = (id) => dispatch({ type: REMOVE_ALERT, payload: id });

  //in other components, once they init the context, the state and actions will be provided as named in the value
  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
        removeAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
