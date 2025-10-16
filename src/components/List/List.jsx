import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTask, toggleTask, setFilter } from "../../redux/actions";

import "./List.css";

const List = () => {
  const tasks = useSelector((state) => state.tasks);
  const filter = useSelector((state) => state.filter);
  const filterText = useSelector((state) => state.filterText);
  const dispatch = useDispatch();

  let filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  filteredTasks = filteredTasks.filter((task) => {
    const text = task.text || "";
    return text.toLowerCase().includes(filterText.toLowerCase());
  });

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <button
          className="list__button"
          type="button"
          style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
          onClick={() => dispatch(setFilter("all"))}
        >
          Всі
        </button>
        <button
          className="list__button"
          type="button"
          style={{ fontWeight: filter === "active" ? "bold" : "normal" }}
          onClick={() => dispatch(setFilter("active"))}
        >
          Активні
        </button>
        <button
          className="list__button"
          type="button"
          style={{ fontWeight: filter === "completed" ? "bold" : "normal" }}
          onClick={() => dispatch(setFilter("completed"))}
        >
          Виконані
        </button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
            />
            <span
              style={{ textDecoration: task.completed ? "line-through" : "" }}
            >
              {task.text}
            </span>
            <button type="button" onClick={() => dispatch(removeTask(task.id))}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
