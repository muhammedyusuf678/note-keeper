import React, { Fragment, useContext, useEffect } from "react";
import NoteContext from "../../context/note/noteContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import NoteItem from "./NoteItem";
import Spinner from "../layouts/Spinner";

export const Notes = () => {
  //init context to access state and actions/methods associated with this context
  const noteContext = useContext(NoteContext);
  const { notes, filtered, getNotes, loading } = noteContext;

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line

    console.log(notes);
  }, []);

  if (notes !== null && notes.length === 0 && !loading) {
    return <h5 className='text-muted mt-2 text-center'>Please add a note</h5>;
  }
  return (
    <Fragment>
      {notes !== null && !loading ? (
        <TransitionGroup>
          {/* if there are items in filtered, show filtered notes */}
          {filtered !== null
            ? filtered.map((note) => (
                <CSSTransition key={note._id} timeout={500} classNames='item'>
                  <NoteItem note={note} />
                </CSSTransition>
              ))
            : notes.map((note) => (
                <CSSTransition key={note._id} timeout={500} classNames='item'>
                  <NoteItem note={note} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Notes;
