import { User } from "./userInterface";

export interface TechStackInterface {
  _id: string;
  name: string;
}

export interface BodyInterface {
  body: string,
  loading: boolean,
  error: string
}

export interface BugInterface {
  _id: string;
  title: string;
  user: User;
  project_id: string;
  body: string;
  isOpen: boolean;
  comments: any;
  labels: any;
  date_opened: string;
  members: Array<User>;
}

export interface ProjectInterface {
  _id: string;
  title: string;
  body: string;
  user: User;
  bugs: Array<BugInterface>;
  date_opened: string;
  members: Array<User>;
  techStack: Array<TechStackInterface>;
  comments: any;
}

export interface initStateInterface {
  projects: Array<ProjectInterface>;
  loading: boolean;
  error: string;
}

export interface selectProjectInitStateInterface {
  project: ProjectInterface;
  error: string;
  loading: boolean;
}
