import type { FunctionComponent, PropsWithChildren } from "react";

export type HOCFunctionalComponent<T = {}> = FunctionComponent<
  PropsWithChildren<T>
>;
