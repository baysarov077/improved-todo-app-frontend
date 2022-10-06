import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodo, postTodo } from "./app/reducers/todoReducer";
import Todo from "./components/todo/Todo";

const Todos = () => {
  const todos = useSelector((state) => state.todos.todos);

  const [value, setValue] = useState("");
  const [find, setFind] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  const handleAddTodo = () => {
    dispatch(postTodo(value));
    setValue("");
    setFind(false);
  };

  const filteredItems = todos.filter((item) =>
    item.text.toLowerCase().includes(value)
  );

  const completedTodos = todos.filter((item) => item.completed).length;

  const handleFindTodo = () => {
    setFind(true);
  };

  return (
    <div className="main-todos-block">
      <h1>{`Всего дел: ${todos.length}`}</h1>
      <div className="h2-list">
        <h2>{`Выполнено: ${completedTodos}`}</h2>
        <h2>{`Осталось: ${todos.length - completedTodos}`}</h2>
      </div>
      <div className="todo_add_block">
        <input
          type="text"
          placeholder="Введите значение"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="add_input"
        />
        <button
          className="add_button"
          onClick={() => value !== " " && handleAddTodo()}
          disabled={!value}
        >
          ADD
        </button>
        <button onClick={() => value && handleFindTodo()} className="find_button">
          FIND
        </button>
      </div>
      <div className="todos">
        {find
          ? filteredItems.map((item) => {
              return (
                <Todo
                  key={item._id}
                  id={item._id}
                  text={item.text}
                  completed={item.completed}
                />
              );
            })
          : todos.map((item) => {
              return (
                <Todo
                  key={item._id}
                  id={item._id}
                  text={item.text}
                  completed={item.completed}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Todos;
