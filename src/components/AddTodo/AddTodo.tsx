import { ChangeEvent, useState } from "react";
import { Todo } from "../../models/Todo";
import "./AddTodo.css";

type AddTodoProps = {
  addTodo: (todo: Todo) => void;
  sortToggle: (sort: boolean) => void;
};

type TodoForm = {
  task: string;
  sort: boolean;
};

export const AddTodo = (props: AddTodoProps) => {
  const [data, setData] = useState<TodoForm>({ task: "", sort: false });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "text") {
      setData({ ...data, [e.target.id]: e.target.value });
    }

    if (e.target.type === "checkbox") {
      setData({ ...data, [e.target.id]: e.target.checked });
      props.sortToggle(e.target.checked);
    }
  };

  return (
    <form
      className="addTodo"
      onSubmit={(e) => {
        e.preventDefault();

        const newTodo = new Todo(Date.now(), data.task, false);
        props.addTodo(newTodo);

        setData({ task: "", sort: data.sort });
      }}
    >
      <div className="input-and-btn-container">
        <div className="input-container">
          <label htmlFor="task">Add todo</label>
          <input
            type="text"
            id="task"
            onChange={handleChange}
            value={data.task}
            minLength={3}
            required
            placeholder="Water all plants"
          />
        </div>
        <button className="btn btn-primary">Add</button>
      </div>
      <div className="checkbox">
      <label htmlFor="sort">Sort alphabetically</label>
      <input
        type="checkbox"
        id="sort"
        checked={data.sort}
        onChange={handleChange}
      />
      </div>
    </form>
  );
};
