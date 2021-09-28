import React from "react";
import { observer } from "mobx-react";
import { Button, Grid, Input } from "@chakra-ui/react";
import { todoStore } from "../store/todo-store";

const TodoAddComponent = () => {
  return (
    <Grid pt={4} templateColumns="5fr 1fr" columnGap="2">
      <Input
        value={todoStore.newTodo}
        onChange={(event) => todoStore.changeNewTodo(event)}
        placeholder="Введите задачу..."
      />
      <Button
        isDisabled={!todoStore.newTodo}
        onClick={() => todoStore.create(todoStore.newTodo)}
      >
        Добавить задачу
      </Button>
    </Grid>
  );
};

export const TodoAdd = observer(TodoAddComponent);
