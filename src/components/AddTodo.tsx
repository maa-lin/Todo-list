import { ChangeEvent, useState } from "react";
import { defaultValue, Todo } from "../models/Todo";

type AddTodoProps = {
    addTodo: (todo: Todo) => void;
}

export const AddTodo = (props: AddTodoProps) => {  

  const [todo, setTodo] = useState<Todo>(defaultValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({...todo, id: Date.now(), task: e.target.value});
  };

  return (
    <form onSubmit={(e) => { 
        e.preventDefault();           
        
        props.addTodo(todo);

        setTodo(defaultValue);
      }}
    >
      <label htmlFor="todo">Add todo</label>
      <input
        type="text"
        id="todo"
        onChange={handleChange}
        value={todo.task}
        minLength={3}
        required
        placeholder="Water all plants"
      />
      <button className="btn-primary">Add</button>
    </form>
  );
};
