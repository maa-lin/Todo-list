import { Todo } from "../models/Todo";

type ShowTodoProp = {
  todo: Todo;
  updateIsDone: (id: number) => void;
  removeTodo: (id: number) => void;
};

export const ShowTodo = (props: ShowTodoProp) => {
  const handleIsDone = () => {
    props.updateIsDone(props.todo.id);
  };

  const handleDelete = () => {
    props.removeTodo(props.todo.id);
  }

  return (
    <div className="flex justify-between items-center bg-white/10 mb-1 px-3 py-1 rounded-[3px] backdrop-blur-sm">
      <p onClick={handleIsDone} className={`${props.todo.isDone ? "line-through decoration-white" : "line-through decoration-transparent hover:decoration-white transition-decoration-color duration-400 ease-in"} capitalize cursor-pointer`}>
      {props.todo.isDone && <i className="fa-solid fa-check text-green-300 mr-1"></i>} {props.todo.task} 
      </p>
      <button className="bg-transparent border-none p-0 text-[rgb(80,62,82)] cursor-pointer hover:text-red-500 hover:transition-colors hover:duration-300 ease-in" onClick={handleDelete}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};
