import {TodoStatus} from "./todo-status";

export interface Todo {
  id: string;
  title: string;
  createdAt: Date;
  status: TodoStatus;
}
