export class Todo {
  constructor(public id: number, public task: string, public isDone: boolean) {}
}

export const defaultValue = {
  id: 0,
  task: "",
  isDone: false
}
