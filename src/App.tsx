import { useState } from "react";
import "./App.css";
import { TodoList } from "./TodoList";
import cuid from "cuid";

export type filterValueType = "all" | "active" | "completed";
export type todoList = {
  id: string;
  title: string;
  filter: filterValueType;
};

function App() {
  const task1Id = cuid();
  const task2Id = cuid();

  let [tasks, setTasks] = useState({
    [task1Id]: [
      { id: cuid(), title: "CSS", isDone: true },
      { id: cuid(), title: "JS", isDone: true },
      { id: cuid(), title: "REACT", isDone: false },
    ],
    [task2Id]: [
      { id: cuid(), title: "Milk", isDone: false },
      { id: cuid(), title: "Car", isDone: true },
      { id: cuid(), title: "Tatu", isDone: true },
    ],
  });

  const removeTask = (id: string, todoListId: string) => {
    let filterTask = tasks[todoListId].filter((item) => item.id !== id);
    tasks[todoListId] = filterTask;
    setTasks({ ...tasks });
  };

  const addTask = (nameTask: string, todoListId: string) => {
    const newTask = { id: cuid(), title: nameTask, isDone: false };
    tasks[todoListId] = [newTask, ...tasks[todoListId]];
    setTasks({ ...tasks });
  };

  const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
    let task = tasks[todoListId].find((item) => item.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasks });
    }
  };

  const [todoList, setTodoList] = useState<todoList[]>([
    {
      id: task1Id,
      title: "Erkin",
      filter: "active",
    },
    {
      id: task2Id,
      title: "Erkin2",
      filter: "completed",
    },
  ]);

  const changeFilter = (name: filterValueType, todoListId: string) => {
    const isChangeItem = todoList.find((el) => {
      return el.id === todoListId;
    });
    if (isChangeItem) {
      isChangeItem.filter = name;
      setTodoList([...todoList]);
    }
  };

  const removeTaskTotal = (taskId: string) => {
    delete tasks[taskId];
    let index: number = 0;
    todoList.forEach((el) => {
      if (el.id === taskId) {
        index = todoList.indexOf(el);
      }
    });
    todoList.splice(index, 1);
    setTodoList([...todoList]);
    setTasks({ ...tasks });
  };

  let [value, setValue] = useState<string>("");

  const addTotalTask = () => {
    setValue("");
    const idTask = cuid();
    todoList.unshift({ id: idTask, title: value, filter: "all" });
    setTodoList([...todoList]);
    tasks[idTask] = [
      { id: cuid(), title: "QQQ", isDone: true },
      { id: cuid(), title: "WWW", isDone: true },
      { id: cuid(), title: "EEE", isDone: false },
    ];
    setTasks({ ...tasks });
  };

  const nameOfTask = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

  return (
    <div className="App">
      <input type="text" value={value} placeholder="Введите название задачи" onChange={nameOfTask} />
      <button onClick={addTotalTask}>+</button>

      {todoList.map((el) => {
        let tasksForToDoList = tasks[el.id];

        if (el.filter === "completed") {
          tasksForToDoList = tasksForToDoList.filter((item) => item.isDone === true);
        }
        if (el.filter === "active") {
          tasksForToDoList = tasksForToDoList.filter((item) => item.isDone === false);
        }
        return (
          <TodoList
            key={el.id}
            idTodoList={el.id}
            title={el.title}
            tasks={tasksForToDoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            removeTaskTotal={removeTaskTotal}
            filter={el.filter}
          />
        );
      })}
    </div>
  );
}
export default App;
