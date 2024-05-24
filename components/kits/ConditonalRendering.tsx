/* eslint-disable react/jsx-no-useless-fragment */
import { Children, type ReactElement } from "react";
import type { HOCFunctionalComponent } from "@/types/component";

const Then: HOCFunctionalComponent = ({ children }) => <>{children}</>;
const Else: HOCFunctionalComponent = ({ children }) => <>{children}</>;
const If: HOCFunctionalComponent<{ condition?: unknown }> = ({
  children,
  condition,
}) => {
  if (!children) return null;

  const childrenArray = Children.toArray(children) as ReactElement[];

  if (condition) {
    return <>{childrenArray.find((child) => child.type === Then)}</>;
  }

  return <>{childrenArray.find((child) => child.type === Else)}</>;
};

export { If, Then, Else };
