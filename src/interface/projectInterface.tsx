import { User } from "./userInterface";

export interface TechStack {
  _id: string;
  name: string;
}

export interface ProjectInterface {
  _id: string;
  title: string;
  body: string;
  user: User;
  bugs: Array<string>;
  dateCreated: string;
  members: Array<User>;
  techStack: Array<TechStack>;
  comments: any;
}

export interface initStateInterface {
  projects: Array<ProjectInterface>;
  loading: boolean;
  error: string;
}

export interface selectProjectInitStateInterface {
  project: ProjectInterface | object,
  error: string,
  loading: boolean
}