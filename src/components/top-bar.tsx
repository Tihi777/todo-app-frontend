import React, { FC } from "react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Flex, Heading, Spacer } from "@chakra-ui/react";

export const TopBar: FC = () => {
  return (
    <Flex py={2} align="center">
      <Heading>РиП Список Задач</Heading>
      <Spacer />
      <ColorModeSwitcher />
    </Flex>
  );
};
