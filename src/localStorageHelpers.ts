import { Todo } from "./models/Todo";

export const saveToLocalStorage = (list: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(list));
};

export const getFromLocalStorage = () => {
  const foundList = localStorage.getItem("todos");

  if (foundList) {
    const todoList: Todo[] = JSON.parse(foundList);
    
    return todoList;

  } else {
    return [
      new Todo(1, "Clean balcony", false),
      new Todo(2, "Water the tomato/chili plants", false),
      new Todo(3, "Repot the herbs", false),
    ];
  }
};