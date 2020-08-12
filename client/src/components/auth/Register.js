import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

export const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/"); //redirect
    }
    if (error) {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]); //want this to run when the error is added to state and when it changes

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      console.log("Register Submit");
      register({
        name,
        email,
        password,
      });
    }
  };
  return (
    <div className='container mt-4'>
      <h1>
        Account <span className='text-info'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>Name</label>

        <div className='form-group w-25'>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            className='form-control'
            required
          />
        </div>
        <label htmlFor='email'>Email Address</label>
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
        <label htmlFor='password'>Password</label>
        <div className='form-group w-25'>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            className='form-control'
            minLength='6'
          />
        </div>
        <label htmlFor='password2'>Confirm Password</label>
        <div className='form-group w-25'>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            className='form-control'
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-info mt-3 pl-5 pr-5'
        />
      </form>
    </div>
  );
};

export default Register;
