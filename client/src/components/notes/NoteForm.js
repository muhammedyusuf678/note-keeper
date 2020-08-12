import React, { useState, useContext, useEffect } from "react";
import NoteContext from "../../context/note/noteContext";
//for add and update
export const NoteForm = () => {
  const noteContext = useContext(NoteContext);
  const { addNote, current, clearCurrent, updateNote } = noteContext;

  useEffect(() => {
    if (current != null) {
      setNote(current); //setNote fills the form
    } else {
      setNote({ title: "", body: "" });
    }
  }, [noteContext, current]); //we only want this effect to occur when context or current is changed

  const [note, setNote] = useState({
    title: "",
    body: "",
  });

  const { title, body } = note;

  const onChange = (e) =>
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current == null) {
      addNote(note);
    } else {
      updateNote(note);
    }
    //go back to default
    setNote({
      title: "",
      body: "",
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-info'>{current ? "Edit Note" : "Add Note"}</h2>
      <div className='form-group'>
        <input
          type='text'
          placeholder='Title'
          name='title'
          value={title}
          className='form-control'
          onChange={onChange}
          required
        />
      </div>

      <div className='form-group'>
        <textarea
          placeholder='Body'
          name='body'
          value={body}
          className='form-control'
          rows='3'
          onChange={onChange}
          required
        />
      </div>
      <input
        type='submit'
        className='btn btn-info'
        value={current ? "Update Note" : "Add Note"}
      />

      {current && (
        <button className='btn btn-muted ml-2' onClick={clearAll}>
          Clear
        </button>
      )}
    </form>
  );
};

export default NoteForm;
