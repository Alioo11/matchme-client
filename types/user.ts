import { Company } from "./company";

interface User {
  _id:string;
  linkedinProfile: string;
  viewed: boolean;
  name: string;
  company: Company;
}

export default User;