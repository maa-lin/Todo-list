import { ChangeEvent, useState } from "react";
import { Todo } from "../models/Todo";

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
      className="text-sm flex flex-col mb-2"
      onSubmit={(e) => {
        e.preventDefault();

        const newTodo = new Todo(Date.now(), data.task, false);
        props.addTodo(newTodo);

        setData({ task: "", sort: data.sort });
      }}
    >
      <div className="flex justify-center items-center mb-2 pb-3">
        <div className="flex flex-col text-left">
          <label htmlFor="task" className="mb-1 uppercase text-xs tracking-wider">Add todo</label>
          <input
            type="text"
            id="task"
            onChange={handleChange}
            value={data.task}
            minLength={3}
            required
            placeholder="Water all plants"
            className="py-1 px-2 rounded-sm bg-white/20 backdrop-blur-sm border border-white/30 text-stone-700 text-sm focus:outline-none focus:border-blue-500 focus:shadow-[2px_2px_5px_rgba(83,50,104,0.7)] placeholder:text-[#9b6fa9]"
          />
        </div>
        <button className="rounded-lg h-10 mt-4 border-none px-5 py-2 text-md font-medium cursor-pointer transition-colors duration-200 ml-3 text-white bg-purple-600 shadow-[2px_2px_5px_rgba(83,50,104,0.7)] hover:bg-sky-400 active:bg-sky-300">Add</button>
      </div>
      <div className="flex justify-center cursor-pointer">
      <label htmlFor="sort" className="mr-1 inline-flex items-center cursor-pointer group">Sort alphabetically</label>
      <input
        type="checkbox"
        id="sort"
        checked={data.sort}
        onChange={handleChange}
        className="relative accent-purple-600 cursor-pointer mt-[1px]"
      />
      </div>
    </form>
  );
};
