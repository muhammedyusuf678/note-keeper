import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { Route, Redirect } from "react-router-dom";
//Wrapping around the Route component provided by react. Add extra layer to route component.
export const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    // not authenticated and done loading
    <Route
      {...rest} //extra props passed in
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          //whatever the component is
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
