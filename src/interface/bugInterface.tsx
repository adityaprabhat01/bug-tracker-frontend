import { User } from "./userInterface"

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
  comments: any,
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