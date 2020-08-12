import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Home from "./components/pages/Home";
// import "./App.css";
import "./bootstrap.min.css";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import NoteState from "./context/note/NoteState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import Alerts from "./components/layouts/Alerts";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
if (localStorage.token) {
  setAuthToken(localStorage.token); //as default request header
}

const App = () => {
  return (
    <AuthState>
      <NoteState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </NoteState>
    </AuthState>
  );
};

export default App;
