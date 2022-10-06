import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, patchTodo } from '../../app/reducers/todoReducer';
import DeleteIcon from '@mui/icons-material/Delete';
import './todo.css'

const Todo = ({text, id, completed}) => {

  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteTodo(id))
  }

  let atDate = new Date().toString()

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
      <div className='atDate' style={{fontSize: '12px', fontWeight: 'normal'}}>{atDate.split(' ').splice(1, 4).join('. ')}</div>
    </div>
  );
};

export default Todo;