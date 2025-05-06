import { useState } from "react";
import { Todo } from "../models/Todo";
import { AddTodo } from "./AddTodo";
import { ShowTodo } from "./ShowTodo";

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([
    new Todo(1, "Clean balcony", false),
    new Todo(2, "Water the tomato/chili plants", false),
    new Todo(3, "Repot the herbs", false),
  ]);

  const [unsortedTodos, setUnsortedTodos] = useState<Todo[]>([]);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo].sort((a, b) => Number(a.isDone) - Number(b.isDone)));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const updateIsDone = (id: number) => {
    setTodos(
      todos
        .map((t) => {
          if (t.id === id) {
            return { ...t, isDone: t.isDone ? false : true };
          }

          return t;
        })
        .sort((a, b) => Number(a.isDone) - Number(b.isDone))
    );
  };

  const sortTodos = (sort: boolean) => {
    if (sort) {
        setUnsortedTodos(todos);

      setTodos(
        [...todos].sort((a, b) => {
          if (a.isDone !== b.isDone) {
            return a.isDone ? 1 : -1;
          }

          return a.task.localeCompare(b.task);
        })
      );
    } else {
        setTodos(unsortedTodos)
    }
  };

  return (
    <>
      <AddTodo addTodo={addTodo} sortTodo={sortTodos} />
      <section>
        {todos.map((t) => (
          <ShowTodo
            key={t.id}
            todo={t}
            updateIsDone={updateIsDone}
            removeTodo={removeTodo}
          />
        ))}
      </section>
    </>
  );
};
