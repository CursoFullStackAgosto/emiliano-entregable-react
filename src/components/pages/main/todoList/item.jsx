import { useDispatch } from "react-redux";
import {
  toggleTodo,
  deleteTodo,
  setEditingTodo,
} from "src/store/store";
import "src/assets/styles/item.scss";

const Item = ({ item, setIsFormVisible }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo(item.id));
  };

  const handleEdit = () => {
    dispatch(setEditingTodo(item));
    setIsFormVisible(true);
  };

  const handleCheckboxChange = () => {
    dispatch(toggleTodo(item.id));
  };

  if (!item) return null;

  return (
    <li className={`item ${item.is_completed ? "completed" : "inProgress"}`}>
      <div className="left">
        <button
          onClick={handleCheckboxChange}
          className="checkBox"
          aria-label={
            item.is_completed
              ? "Mark task as incomplete"
              : "Mark task as complete"
          }
        >
          <input
            type="checkbox"
            checked={item.is_completed}
            onChange={handleCheckboxChange}
            aria-checked={item.is_completed}
            readOnly
          />
          <div className="transition"></div>
        </button>
      </div>
      <div className="middle">
        <p className="title">{item.title}</p>
        <p className="date">{item.date}</p>
        <p className="description">{item.description}</p>
      </div>
      <div className="right">
        <button
          onClick={() => handleEdit(item)}
          className="edit"
          aria-label="Edit task"
        >
          <i className="fa-solid fa-pen-to-square" aria-hidden="true"></i>
        </button>
        <button
          onClick={handleDelete}
          className="deleteButton"
          aria-label="Delete task"
        >
          <svg
            className="deleteTop"
            viewBox="0 0 39 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4"></line>
            <line
              x1="12"
              y1="1.5"
              x2="26.0357"
              y2="1.5"
              stroke="white"
              strokeWidth="3"
            ></line>
          </svg>
          <svg
            className="deleteBottom"
            viewBox="0 0 33 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1_8_19" fill="white">
              <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
            </mask>
            <path
              d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
              fill="white"
              mask="url(#path-1-inside-1_8_19)"
            ></path>
            <path d="M12 6L12 29" stroke="white" strokeWidth="4"></path>
            <path d="M21 6V29" stroke="white" strokeWidth="4"></path>
          </svg>
        </button>
      </div>
    </li>
  );
};

export default Item;
