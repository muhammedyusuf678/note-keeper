import React, { useContext, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import NoteContext from "../../context/note/noteContext";
export const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const noteContext = useContext(NoteContext);
  const { isAuthenticated, logout, user } = authContext;
  const { clearNotes } = noteContext;

  const onLogout = () => {
    logout();
    clearNotes();
  };

  const authLinks = (
    <Fragment>
      <span className='navbar-text'>Hello {user && user.name}</span>
      <li>
        <a href='#!' onClick={onLogout} className='nav-link'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm '>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link to='/register' className='nav-link'>
          Register
        </Link>
      </li>
      <li>
        <Link to='/login' className='nav-link'>
          Login
        </Link>
      </li>
    </Fragment>
  );
  return (
    <nav class='navbar navbar-expand-lg navbar-light bg-info'>
      <a class='navbar-brand' href='#'>
        <i className={icon} />
        {title}
      </a>

      <div class='collapse navbar-collapse' id='navbarText'>
        <ul class='navbar-nav ml-auto'>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Note Keeper",
  icon: "fas fa-sticky-note mr-3",
};

export default Navbar;
