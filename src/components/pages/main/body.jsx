import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "src/assets/styles/body.modules.scss";
import Form from "./form/form.jsx";
import TodoList from "./todoList/TodoList.jsx";
import { updateTodo, setEditingTodo } from "src/store/store.jsx";

const Body = () => {
  const todos = useSelector((state) => state.todos);
  const editingTodo = useSelector((state) => state.editingTodo);
  const dispatch = useDispatch();

  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const onClose = () => {
    setIsFormVisible(false);
    dispatch(setEditingTodo(null));
  };

  const handleCheckboxChange = (id) => {
    const updatedTodo = todos.find((todo) => todo.id === id);
    if (updatedTodo) {
      dispatch(
        updateTodo({ ...updatedTodo, is_completed: !updatedTodo.is_completed })
      );
    }
  };

  return (
    <div className="container formPosition">
      {!isFormVisible && (
        <button className="Btn" onClick={toggleFormVisibility}>
          Add New Task
        </button>
      )}

      {isFormVisible && (
        <Form
          formValues={editingTodo || null}
          isFormVisible={isFormVisible}
          onClose={onClose}
        />
      )}

      {!isFormVisible && (
        <TodoList
          todos={todos}
          handleCheckboxChange={handleCheckboxChange}
          editingTodo={editingTodo}
          setIsFormVisible={setIsFormVisible}
        />
      )}
    </div>
  );
};

export default Body;
