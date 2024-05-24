import React from "react";
import { Flex } from "antd";
import type { HOCFunctionalComponent } from "@/types/component";

const Container: HOCFunctionalComponent = ({ children }) => (
  <Flex style={{ maxWidth: 1900, width: "95%", margin: "1rem auto" }}>
    {children}
  </Flex>
);

export default Container;
