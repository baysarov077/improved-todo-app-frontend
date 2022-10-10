import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, patchTodo } from '../../app/reducers/todoReducer';
import DeleteIcon from '@mui/icons-material/Delete';
import './todo.css'

const Todo = ({text, id, completed, date}) => {

  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteTodo(id))
  }

  return (
    <div>
      <div className={completed ? 'completed-todo' : 'todo_block'}>
        <div>
        <label className="switch">
          <input type="checkbox" onChange={() => dispatch(patchTodo({id, completed}))} checked={completed}/>
          <span className="slider"></span>
        </label>
        </div>
        <p>{text}</p>
        <DeleteIcon style={{cursor: 'pointer'}} onClick={() => handleDelete()}/>
      </div>
      <div className='atDate' style={{fontSize: '12px', fontWeight: 'normal'}}>{date.slice(4, 25)}</div>
    </div>
  );
};

export default Todo;