import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, setFilterText } from "../../redux/actions";

import "./Head.css";

const Head = () => {
  const tasks = useSelector((state) => state.tasks);
  const filterText = useSelector((state) => state.filterText);
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState("");

  const activeTasks = tasks.filter((task) => !task.completed).length;
  const completed = tasks.filter((task) => task.completed).length;

  const handleAdd = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    dispatch(addTask(newTask.trim()));
    setNewTask("");
  };

  return (
    <section className="head">
      <h3 className="head__title">Задачі</h3>
      <div className="head__box">
        <p className="head__data">Активні: {activeTasks}</p>
        <p className="head__data">Виконані: {completed}</p>
      </div>
      <form
        className="head__form"
        onSubmit={handleAdd}
        style={{ marginBottom: "10px" }}
      >
        <input
          className="head__input"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Введіть нову задачу"
        />
        <button className="head__submit" type="submit">Додати</button>
      </form>

      <form className="head__filter" onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="Пошук за назвою"
          type="text"
          value={filterText}
          onChange={(e) => dispatch(setFilterText(e.target.value))}
        />
        <button className="head__submit" type="button" onClick={() => dispatch(setFilterText(""))}>
          Скинути
        </button>
      </form>
    </section>
  );
};

export default Head;
