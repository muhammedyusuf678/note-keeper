import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
export const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/"); //redirect
    }
    if (error == "Incorrect Email" || error == "Incorrect Password") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({
        email,
        password,
      });
    }
  };
  return (
    <div className='container mt-4'>
      <h1>
        Account <span className='text-info'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <label htmlFor='email' className='mr-2'>
          Email Address
        </label>
        <div className='form-group w-25'>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            className='form-control'
            required
          />
        </div>
        <label htmlFor='password' className='mr-2'>
          Password
        </label>
        <div className='form-group w-25'>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            className='form-control'
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-info mt-3 pl-5 pr-5'
        />
      </form>
    </div>
  );
};

export default Login;
