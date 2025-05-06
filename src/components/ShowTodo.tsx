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
    <div>
      <p onClick={handleIsDone} className={props.todo.isDone ? "done" : ""}>
        {props.todo.task} {props.todo.isDone && <i className="fa-solid fa-check"></i>}
      </p>
      <button className="btn btn-delete" onClick={handleDelete}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};
