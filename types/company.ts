import { Nullable } from "ts-wiz";

type visaStatus = "true" | "false";

export interface Company {
  title: string;
  location: Nullable<string>;
  visa: Nullable<visaStatus>;
}
