import { User } from "./userInterface"

export interface CommentInterface {
  user: User,
  project_id: string,
  bug_id: string,
  body: string,
  _id: string,
  dateCreated: string
}

export interface BugInterface {
  title: string,
  body: {
    body: string,
    loading: boolean,
    error: string
  },
  dateOpen: string,
  isOpen: {
    isOpen: boolean,
    loading: boolean,
    error: string
  },
  project_id: string,
  _id: string,
  user: User,
  comments: {
    comments: Array <CommentInterface>,
    loading: boolean,
    error: string
  },
  members: {
    members: Array<User>,
    loading: boolean,
    error: string
  },
  labels: {
    labels: Array<string>,
    loading: boolean,
    error: string
  },
  loading: boolean,
  error: string
}