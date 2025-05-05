import { useState } from "react";
import { Todo } from "../models/Todo";
import { AddTodo } from "./AddTodo";

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([
    new Todo(1, "Clean balcony", false),
    new Todo(2, "Water the tomato/chili plants", false),
    new Todo(3, "Repot the herbs", false),
  ]);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  console.log(JSON.stringify(todos));

  return (
    <>
      <AddTodo addTodo={addTodo} />
    </>
  );
};
