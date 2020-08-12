import React, { useContext, useEffect } from "react";
import Notes from "../notes/Notes";
import NoteForm from "../notes/NoteForm";
import NoteFilter from "../notes/NoteFilter";
import AuthContext from "../../context/auth/authContext";
export const Home = () => {
  //to stay authenticated! hit backend on page load
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []); //do as soon as component loads
  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col'>
          <NoteForm />
        </div>
        <div className='col'>
          <NoteFilter />
          <Notes />
        </div>
      </div>
    </div>
  );
};

export default Home;
