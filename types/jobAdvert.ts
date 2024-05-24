import { Nullable } from "ts-wiz";
import { Company } from "./company";

export interface JobAdvert {
  _id: string;
  crawledAt: number;
  announcedAt: number;
  link: string;
  description: string;
  lastApply: Nullable<string>;
  platform: string;
  company: Nullable<Company>;
  experience: number;
  jobTitle: Nullable<string>;
  skills: string[];
}

export interface JobAdvertReport {
  jobadvert: {
    total_number: number;
  };
  apply: {
    total_number: number;
    daily_number: Array<{ _id: string; count: number }>;
  };
}
