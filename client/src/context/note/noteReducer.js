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

//state is immutable, so a new copy has to be made everytime
//each case should only do the one thing in the case and not stuff from other cases
export default (state, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
        loading: false,
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        loading: false,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
        loading: false,
        filtered: null,
      };
    case CLEAR_NOTES:
      return {
        ...state,
        notes: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id == action.payload._id ? action.payload : note
        ),
        loading: false,
        filtered: null,
      };
    case FILTER_NOTES:
      return {
        ...state,
        filtered: state.notes.filter((note) => {
          const regex = new RegExp(`${action.payload}`, "gi"); //gi -> global, case-insensitive
          return note.title.match(regex) || note.body.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case NOTE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
