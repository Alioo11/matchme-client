import type { Nullable } from "ts-wiz";

interface Skill {
  yearsOfExperience: number;
  title: string;
  matches: Array<string>;
  writen: Nullable<string>;
}

export default Skill;
