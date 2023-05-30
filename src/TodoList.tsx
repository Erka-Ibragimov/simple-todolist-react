import React, { ChangeEvent, useState } from "react";
import { filterValueType } from "./App";
import "./App.css";

export type Task = { id: string; title: string; isDone: boolean };

type Props = {
  title: string;
  tasks: Task[];
  removeTask: (id: string) => void;
  changeFilter: (name: filterValueType) => void;
  addTask: (nameTask: string) => void;
  changeStatus: (taskId: string, isDone: boolean) => void;
  filter: filterValueType;
};

export const TodoList = (props: Props) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);
  const onClickAddTask = () => {
    if (value.trim() === "") {
      setError("Поле обязательное");
      return;
    }
    props.addTask(value.trim());
    setValue("");
  };
  const onDownKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.code === "Enter") {
      onClickAddTask();
    }
  };
  const allTask = () => props.changeFilter("all");
  const activeTask = () => props.changeFilter("active");
  const completedTask = () => props.changeFilter("completed");

  return (
    <div>
      <h1>{props.title}</h1>
      <div>
        <input value={value} onChange={onChangeHandler} onKeyDown={onDownKeyHandler} className={error ? "error" : ""} />
        <button onClick={onClickAddTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((item) => {
          const onRemoveHandler = () => props.removeTask(item.id);
          const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(item.id, e.currentTarget.checked);
          };

          return (
            <li key={item.id} className={item.isDone ? "is-done" : ""}>
              <input type="checkbox" onChange={onChangeCheckbox} checked={item.isDone} />
              <span>{item.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button className={props.filter === "all" ? "active-filter" : ""} onClick={allTask}>
          All
        </button>
        <button className={props.filter === "active" ? "active-filter" : ""} onClick={activeTask}>
          Active
        </button>
        <button className={props.filter === "completed" ? "active-filter" : ""} onClick={completedTask}>
          Completed
        </button>
      </div>
    </div>
  );
};
