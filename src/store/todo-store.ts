import { Todo } from "../models/todo";
import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import { TodoStatus } from "../models/todo-status";

const removeTodo = (todos: Todo[], id: string): Todo[] =>
  todos.filter((todo) => todo.id !== id);

const replaceTodo = (todos: Todo[], id: string, item: Todo): Todo[] =>
  todos.map((todo) => (todo.id === id ? item : todo));

export interface TodoUpdateRequest {
  title?: string;
  status?: TodoStatus;
}

class TodoStore {
  private todoApiUrl = process.env.REACT_APP_API_HOSTNAME + "/todo";

  todos: Todo[] = [];
  newTodo: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  changeNewTodo(event: ChangeEvent<HTMLInputElement>) {
    this.newTodo = event.target.value;
  }

  load() {
    fetch(this.todoApiUrl)
      .then((resp) => resp.json())
      .then((todos: Todo[]) => (this.todos = todos));
  }

  create(title: string) {
    fetch(this.todoApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    })
      .then((resp) => resp.json())
      .then((todo: Todo) => this.todos.push(todo))
      .then(() => (this.newTodo = ""));
  }

  update(id: string, updateRequest: TodoUpdateRequest) {
    fetch(`${this.todoApiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateRequest),
    })
      .then((resp) => resp.json())
      .then((todo: Todo) => (this.todos = replaceTodo(this.todos, id, todo)));
  }

  checkTodo(id: string, status: TodoStatus) {
    this.update(id, { status });
  }

  delete(id: string) {
    fetch(`${this.todoApiUrl}/${id}`, {
      method: "DELETE",
    }).then(() => (this.todos = removeTodo(this.todos, id)));
  }
}

export const todoStore = new TodoStore();
