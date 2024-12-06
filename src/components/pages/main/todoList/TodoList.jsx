import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  setEditingTodo,
  toggleTodo,
} from "src/store/store.jsx";
import Item from "./item.jsx";
import "src/assets/styles/todoList.scss";

const TodoList = ({ setIsFormVisible }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (item) => {
    dispatch(setEditingTodo(item));
  };

  const handleCheckboxChange = (id) => {
    dispatch(toggleTodo(id));
  };

  return (
    <div className="todoList">
      <ol>
        {todos && todos.length > 0 ? (
          todos.map((item) => (
            <Item
              key={item.id}
              item={item}
              handleCheckboxChange={handleCheckboxChange}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              setIsFormVisible={setIsFormVisible}
            />
          ))
        ) : (
          <p className="noTasks">
            No tasks added yet, can I help you get organized?
          </p>
        )}
      </ol>
    </div>
  );
};

export default TodoList;
