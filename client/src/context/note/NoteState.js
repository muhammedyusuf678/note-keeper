import React, { useReducer } from "react";
import axios from "axios";
import NoteContext from "./noteContext";
import NoteReducer from "./noteReducer";
import {
  ADD_NOTE,
  DELETE_NOTE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_NOTE,
  FILTER_NOTES,
  CLEAR_FILTER,
  NOTE_ERROR,
  GET_NOTES,
  CLEAR_NOTES,
} from "../types";

const NoteState = (props) => {
  const initialState = {
    notes: null, // or empty array
    current: null,
    filtered: null, //filter from fetched notes without overriding notes array. Frontend filter, not backend search api endpoint
    error: null,
  };
  const [state, dispatch] = useReducer(NoteReducer, initialState);

  //Actions
  //Get notes
  const getNotes = async () => {
    try {
      const res = await axios.get("/notes");
      //dispatch "action" to reducer
      console.log(res);
      dispatch({ type: GET_NOTES, payload: res.data.notes });
    } catch (err) {
      dispatch({ type: NOTE_ERROR, payload: err.message });
    }
  };

  //Clear notes
  const clearNotes = () => {
    dispatch({ type: CLEAR_NOTES });
  };

  //Add Note
  const addNote = async (note) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //token is set globally to request headers as long as token exists

    try {
      const res = await axios.post("/notes", note, config);
      //dispatch "action" to reducer
      dispatch({ type: ADD_NOTE, payload: res.data.note });
    } catch (err) {
      console.log(err);
      dispatch({ type: NOTE_ERROR, payload: err.response.msg });
    }
  };

  //Update Note
  const updateNote = async (note) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/notes/${note._id}`, note, config);
      dispatch({ type: UPDATE_NOTE, payload: res.data.note });
      clearCurrent(); //best call function rather than manually clear current in reducer
    } catch (err) {
      dispatch({ type: NOTE_ERROR, payload: err.response.msg });
    }
  };

  //Delete note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`/notes/${id}`);
      dispatch({ type: DELETE_NOTE, payload: id });
    } catch (err) {
      dispatch({ type: NOTE_ERROR, payload: err.response.msg });
    }
  };

  //Set Current Note
  const setCurrent = (note) => {
    dispatch({ type: SET_CURRENT, payload: note });
  };

  //Clear Current Note
  const clearCurrent = () => {
    dispatch({ type: SET_CURRENT });
  };

  //Filter Notes
  const filterNotes = (text) => {
    dispatch({ type: FILTER_NOTES, payload: text });
  };

  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  //return provider to wrap the entire app in context
  //anything u wanna be able to access from other components including state and actions have to be defined in value
  //"provide" functions and state parts to components
  return (
    <NoteContext.Provider
      value={{
        notes: state.notes,
        current: state.current,
        filtered: state.filtered, //filtered part of state
        error: state.error,
        addNote,
        deleteNote,
        updateNote,
        setCurrent,
        clearCurrent,
        filterNotes,
        clearFilter,
        getNotes,
        clearNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
