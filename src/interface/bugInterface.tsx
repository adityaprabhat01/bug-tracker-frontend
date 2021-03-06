import { User } from "./userInterface";

export interface CommentInterface {
  user: User;
  project_id: string;
  bug_id: string;
  body: string;
  _id: string;
  dateCreated: string;
  activity: {
    isActivity: boolean;
    value: string;
  };
  reactions: Array<ReactionsInterface>
}

export interface LabelInterface {
  name: string;
  assigned: boolean;
  color: string;
  _id: string;
}

export interface ReactionsInterface {
  name: string;
  count: number;
  _id: string;
}

export interface BugInterface {
  title: string;
  body: {
    body: string;
    loading: boolean;
    error: string;
  };
  date_opened: string;
  isOpen: boolean,
  project_id: string;
  _id: string;
  user: User;
  comments: {
    comments: Array<CommentInterface>;
    loading: boolean;
    error: string;
  };
  members: {
    members: Array<User>;
    loading: boolean;
    error: string;
  };
  labels: {
    labels: Array<LabelInterface>;
    loading: boolean;
    error: string;
  };
  mentionId: number | null;
  loading: boolean;
  error: string;
}
