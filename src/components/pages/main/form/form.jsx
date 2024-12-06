import "src/assets/styles/form.scss";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "src/store/store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";

const Form = ({ formValues, isFormVisible, onClose }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // manage invalid date format
  useEffect(() => {
    if (formValues) {
      setTitle(formValues.title || "");
      setDescription(formValues.description || "");
      if (formValues.date) {
        const parsedDate = new Date(formValues.date);
        if (!isNaN(parsedDate)) {
          setDate(parsedDate);
        } else {
          console.error("Invalid date format:", formValues.date);
          setDate(null);
        }
      } else {
        setDate(null);
      }
    }
  }, [formValues]);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !date || !description.trim()) {
      setError("¡Please fill in all the fields!");
      return;
    }

    setError("");

    const formattedDate = date.toLocaleDateString("en-GB");

    if (formValues && formValues.id) {
      dispatch(
        updateTodo({
          ...formValues,
          title,
          date: formattedDate,
          description,
        })
      );
    } else {
      dispatch(
        addTodo({
          title,
          id: uuidv4(),
          is_completed: false,
          date: formattedDate,
          description,
        })
      );
    }

    setTitle("");
    setDate(null);
    setDescription("");
    onClose();
  };

  if (!isFormVisible) return null;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="formHeader">
        <button className="close" onClick={handleClose}>
          <i className="fa-solid fa-x"></i>
        </button>
      </div>
      <div className="formContent">
        {error && <p className="error">{error}</p>}
        <label className="formLabel">Title</label>
        <input
          className="formInput"
          type="text"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter task name"
        />
        <label className="formLabel">Date</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd-MM-yyyy"
          className="formInput"
        />
        <label className="formLabel">Description</label>
        <textarea
          className="formInput"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          cols="30"
          rows="4"
          placeholder="Enter task description"
        ></textarea>
        <div className="submitBtn">
          <button className="Btn" type="submit">
            {formValues ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
