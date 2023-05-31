import React, { ChangeEvent, useState } from "react";
import { filterValueType } from "./App";
import "./App.css";

export type Task = { id: string; title: string; isDone: boolean };

type Props = {
  idTodoList: string;
  title: string;
  tasks: Task[];
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (name: filterValueType, idTodoList: string) => void;
  addTask: (nameTask: string, todoListId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  removeTaskTotal: (taskId: string) => void;
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
    props.addTask(value.trim(), props.idTodoList);
    setValue("");
  };
  const onDownKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.code === "Enter") {
      onClickAddTask();
    }
  };
  const allTask = () => props.changeFilter("all", props.idTodoList);
  const activeTask = () => props.changeFilter("active", props.idTodoList);
  const completedTask = () => props.changeFilter("completed", props.idTodoList);
  const removeTask = () => props.removeTaskTotal(props.idTodoList);

  return (
    <div>
      <h1>
        {props.title} <button onClick={removeTask}>X</button>
      </h1>
      <div>
        <input value={value} onChange={onChangeHandler} onKeyDown={onDownKeyHandler} className={error ? "error" : ""} />
        <button onClick={onClickAddTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((item) => {
          const onRemoveHandler = () => props.removeTask(item.id, props.idTodoList);
          const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(item.id, e.currentTarget.checked, props.idTodoList);
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
