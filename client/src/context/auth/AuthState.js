import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  //when page is refreshed inital state is restored
  const initialState = {
    token: localStorage.getItem("token"), //browser local storage
    isAuthenticated: null,
    loading: true, //true -> false, rather than f->t->f
    user: null, //which user dealing with
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Actions
  //Load User -- check which user is logged in and get token //loadUser from token
  const loadUser = async () => {
    //set token into a global header so that header doesnt have to be set for each request
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/login");
      dispatch({ type: USER_LOADED, payload: res.data.user });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  //Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("making register request");
    try {
      const res = await axios.post("/register", formData, config); //proxy in package json has backend link
      if (res.data.error == false)
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      loadUser(); //puts token as default request header after it is put into local storage by reducer
    } catch (err) {
      //send error response message from backend to reducer so it modifies state and u can have frontend alert
      console.log("register error");
      console.log(err.response.data.errors);
      let payload;
      if (typeof err.response.data.errors !== "undefined") {
        payload = err.response.data.errors[0].msg; //err from express-validator
      } else {
        payload = err.response.data.message;
      }
      dispatch({ type: REGISTER_FAIL, payload: payload }); //.msg from backend err response
    }
  };
  //Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/login", formData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      loadUser();
    } catch (err) {
      console.log("login error");
      console.log(err);
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.message });
    }
  };

  //Logout -- destroy token
  const logout = () => dispatch({ type: LOGOUT });

  //Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    //add/provide stuff to the context inside state
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        register,
        login,
        loadUser,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
