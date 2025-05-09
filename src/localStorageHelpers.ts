import { Todo } from "./models/Todo";

export const saveListToLocalStorage = (list: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(list));
};

export const getListFromLocalStorage = () => {
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

export const saveIsSortedToLocalStorage = (sort: boolean) => {
  localStorage.setItem("isSorted", JSON.stringify(sort));
}

export const getIsSortedFromLocalStorage = () => {
  const foundValue = localStorage.getItem("isSorted");

  if (foundValue) {
    return JSON.parse(foundValue);
  } else {
    return false;
  }
}