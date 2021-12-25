import {Todo} from "../models/todo";
import {makeAutoObservable} from "mobx";
import {ChangeEvent} from "react";
import {TodoStatus} from "../models/todo-status";
import {io} from "socket.io-client"

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
  private socket = io("http://localhost:3000");

  todos: Todo[] = [];
  newTodo: string = "";

  constructor() {
    makeAutoObservable(this);
    this.socket.on('loadTodos', (todos) => {
      this.todos = todos;
    })
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
    this.socket.emit('createTodo', {title})
    this.newTodo = ''
  }

  update(id: string, updateRequest: TodoUpdateRequest) {
    this.socket.emit('updateTodo', {id, updateRequest})
  }

  checkTodo(id: string, status: TodoStatus) {
    this.update(id, {status});
  }

  delete(id: string) {
    this.socket.emit('deleteTodo', {id})
  }
}

export const todoStore = new TodoStore();
