import { SIGNUP_REQUEST } from "./authTypes"

interface Data {
  name: string,
  username: string,
  email: string,
  password: string,
  loading: boolean,
  error: string
}

export const signup_request = (data: Data) => {
  return {
    type: SIGNUP_REQUEST,
    payload: data
  }
}