import Skill from "./skill";

interface Resume {
  summary: string;
  skills: Array<Skill>;
  idekavanMentions: Array<string>;
  nahiraMentions: Array<string>;
}

export default Resume;
