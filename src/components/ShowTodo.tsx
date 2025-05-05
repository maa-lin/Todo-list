import { Todo } from "../models/Todo";

type ShowTodoProp = {
  todo: Todo;
  updateIsDone: (id: number) => void;
};

export const ShowTodo = (props: ShowTodoProp) => {
  const handleClick = () => {
    props.updateIsDone(props.todo.id);
  };

  return (
    <div>
      <p onClick={handleClick} className={props.todo.isDone ? "done" : ""}>
        {props.todo.task} {props.todo.isDone && <i className="fa-solid fa-check"></i>}
      </p>
      <button className="btn-delete">
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};
