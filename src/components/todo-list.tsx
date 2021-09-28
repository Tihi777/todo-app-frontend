import React, { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { todoStore } from "../store/todo-store";
import { Box, Button, Checkbox, Flex, Input } from "@chakra-ui/react";
import { TodoStatus } from "../models/todo-status";
import { Todo } from "../models/todo";

const TodoListComponent: FC = () => {
  useEffect(() => {
    todoStore.load();
  }, []);

  const handleTodoCheck = (todo: Todo) => () => {
    const todoStatus =
      todo.status === TodoStatus.DONE ? TodoStatus.OPEN : TodoStatus.DONE;
    todoStore.checkTodo(todo.id, todoStatus);
  };

  return (
    <Box>
      {todoStore.todos.map((todo) => (
        <Flex pt={2} key={todo.id}>
          <Checkbox
            isChecked={todo.status === TodoStatus.DONE}
            onChange={handleTodoCheck(todo)}
          />
          <Input
            mx={2}
            value={todo.title}
            onChange={(event) => (todo.title = event.target.value)}
          />
          <Button
            mr={2}
            px={4}
            onClick={() => todoStore.update(todo.id, { title: todo.title })}
          >
            Обновить
          </Button>
          <Button px={4} onClick={() => todoStore.delete(todo.id)}>
            Удалить
          </Button>
        </Flex>
      ))}
    </Box>
  );
};

export const TodoList = observer(TodoListComponent);
