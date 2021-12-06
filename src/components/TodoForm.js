import React, { useState } from "react";
import { addTodos } from "../store/reducers/todosSlice";
import { useDispatch } from "react-redux";

const TodoForm = () => {
  const [title, setTitle] = useState("");

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const dispatch = useDispatch();

  const addSingleTodo = (event) => {
    event.preventDefault();
    // console.log(title);
    dispatch(addTodos(title));
    setTitle("");
  };
  return (
    <div>
      <form onSubmit={addSingleTodo}>
        <input type="text" value={title} onChange={changeTitle} />
        <input type="submit" value="Add todo" />
      </form>
    </div>
  );
};

export default TodoForm;
