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

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    
  };

  const updateIsDone = (id: number) => {
    setTodos(todos.map((t) => {
        if (t.id === id) {
            return {...t, isDone: t.isDone ? false : true}
        }

        return t;
    }));
  };

  return (
    <>
      <AddTodo addTodo={addTodo} />
      <section>
        {todos.map((t) => (
            <ShowTodo key={t.id} todo={t} updateIsDone={updateIsDone}/>
        ))}
      </section>
    </>
  );
};
