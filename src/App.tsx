import React, { useState } from "react";
import "./App.css";
import { Task, TodoList } from "./TodoList";
import cuid from "cuid";

export type filterValueType = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState<Task[]>([
    { id: cuid(), title: "CSS", isDone: true },
    { id: cuid(), title: "JS", isDone: true },
    { id: cuid(), title: "REACT", isDone: false },
  ]);
  let [filter, setFilter] = useState<filterValueType>("all");

  let tasksForToDoList = tasks;

  if (filter === "completed") {
    tasksForToDoList = tasks.filter((item) => item.isDone === true);
  }
  if (filter === "active") {
    tasksForToDoList = tasks.filter((item) => item.isDone === false);
  }

  const removeTask = (id: string) => {
    let filterTasks = tasks.filter((item) => item.id !== id);
    setTasks(filterTasks);
  };

  const changeFilter = (name: filterValueType) => {
    setFilter(name);
  };

  const addTask = (nameTask: string) => {
    const newTask = { id: cuid(), title: nameTask, isDone: false };
    setTasks([newTask, ...tasks]);
  };

  const changeStatus = (taskId: string, isDone: boolean) => {
    let task = tasks.find((item) => item.id === taskId);
    if (task) {
      task.isDone = isDone;
      // const updataTasks = tasks.map((el) => {
      //   if (el.id === task?.id) {
      //     return task;
      //   }
      //   return el;
      // });
      setTasks([...tasks]);
    }
  };

  return (
    <div className="App">
      <TodoList
        title="Erkin"
        tasks={tasksForToDoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}
export default App;
