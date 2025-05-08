import { useState } from "react";
import { Todo } from "../../models/Todo";
import { AddTodo } from "../AddTodo/AddTodo";
import { ShowTodo } from "../ShowTodo/ShowTodo";
import "./Todos.css";
import confetti from "canvas-confetti";

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([
    new Todo(1, "Clean balcony", false),
    new Todo(2, "Water the tomato/chili plants", false),
    new Todo(3, "Repot the herbs", false),
  ]);

  const [isSorted, setIsSorted] = useState(false);

  let sortedTodos;

  if (isSorted) {
    sortedTodos = [...todos].sort((a, b) => {
      if (a.isDone !== b.isDone) return a.isDone ? 1 : -1;
      return a.task.localeCompare(b.task);
    });
  } else {
    sortedTodos = [...todos]; 
  }

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo].sort((a, b) => Number(a.isDone) - Number(b.isDone)));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const updateIsDone = (id: number) => {
    const updatedTodos = todos.map((t) => {
          if (t.id === id) {
            return { ...t, isDone: t.isDone ? false : true };
          }

          return t;
        })
        .sort((a, b) => Number(a.isDone) - Number(b.isDone))

    const allDone = updatedTodos.length > 0 && updatedTodos.every((t) => t.isDone);

    if (allDone) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.8 },
      });
    }

    setTodos(updatedTodos);
  };

  const sortToggle = (sort: boolean) => {
      setIsSorted(sort);
  };

  return (
    <div className="card">
      <h2>Today's To-Do</h2>
      <AddTodo addTodo={addTodo} sortToggle={sortToggle} />
      <section className="list-container">
        {sortedTodos.map((t) => (
          <ShowTodo
            key={t.id}
            todo={t}
            updateIsDone={updateIsDone}
            removeTodo={removeTodo}
          />
        ))}
      </section>
    </div>
  );
};
