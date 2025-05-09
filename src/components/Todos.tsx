import { useState } from "react";
import { Todo } from "../models/Todo";
import { AddTodo } from "./AddTodo";
import { ShowTodo } from "./ShowTodo";
import confetti from "canvas-confetti";
import { 
  getListFromLocalStorage, 
  saveListToLocalStorage, 
  saveIsSortedToLocalStorage, 
  getIsSortedFromLocalStorage 
} from "../localStorageHelpers";

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>(getListFromLocalStorage());

  const [isSorted, setIsSorted] = useState(getIsSortedFromLocalStorage());

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
    const updatedTodos = [...todos, newTodo].sort((a, b) => Number(a.isDone) - Number(b.isDone));

    setTodos(updatedTodos);
    saveListToLocalStorage(updatedTodos);
    saveIsSortedToLocalStorage(isSorted);
  };

  const removeTodo = (id: number) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    const allDone = updatedTodos.length > 0 && updatedTodos.every((t) => t.isDone);
    
    setTodos(updatedTodos);
    
    if (allDone) {
      saveListToLocalStorage([]);
    } else {
      saveListToLocalStorage(updatedTodos);
    }
  };

  const updateIsDone = (id: number) => {
    const updatedTodos = todos.map((t) => {
          if (t.id === id) {
            return { ...t, isDone: t.isDone ? false : true };
          }

          return t;
        }).sort((a, b) => Number(a.isDone) - Number(b.isDone))


    setTodos(updatedTodos);

    const allDone = updatedTodos.length > 0 && updatedTodos.every((t) => t.isDone);

    if (allDone) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.8 },
      });

      saveListToLocalStorage([]);
      saveIsSortedToLocalStorage(false);
    } else {
      saveListToLocalStorage(updatedTodos);
    }

  };

  const sortToggle = (sort: boolean) => {
      const updatedIsSorted = sort;

      setIsSorted(sort);
      saveIsSortedToLocalStorage(updatedIsSorted);
  };

  return (
    <div className="flex flex-col items-center gap-[20px] px-7 py-11 rounded-xl shadow-[5px_5px_15px_rgba(83,50,104,0.7)] bg-white/20 backdrop-blur-md border border-white/30 w-sm">
      <h2 className="text-white text-center font-medium text-3xl px-5 pb-2 border-b border-white mb-4">Today's To-Do</h2>
      <AddTodo addTodo={addTodo} sortToggle={sortToggle} />
      <section className="w-full">
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
