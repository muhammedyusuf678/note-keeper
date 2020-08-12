import React, { useContext } from "react";
import PropTypes from "prop-types";
import NoteContext from "../../context/note/noteContext";
export const NoteItem = ({ note }) => {
  const noteContext = useContext(NoteContext);
  const { deleteNote, setCurrent, clearCurrent } = noteContext;
  const { _id, title, body } = note;

  const onDelete = () => {
    deleteNote(_id); //from props
    clearCurrent();
  };
  return (
    <div className='card mt-2'>
      <h3 className='text-info text-center mt-2'>{title} </h3>
      <p className='text-dark text-left ml-2 mr-2'>{body} </p>

      <p className='text-center'>
        {/* onclick should refer to a function to call, not call it on render */}
        <button
          className='btn btn-info btn-sm mr-3'
          onClick={() => setCurrent(note)}
        >
          <i className='fas fa-edit mr-2'></i>
          Edit
        </button>
        <button className='btn btn-danger btn-sm ml-3' onClick={onDelete}>
          <i className='fas fa-minus-circle mr-2'></i>
          Delete
        </button>
      </p>
    </div>
  );
};

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
};
export default NoteItem;
