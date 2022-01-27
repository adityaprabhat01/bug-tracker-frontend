import { SIGNUP_REQUEST } from "./authTypes";

const initState = {
  name: "",
  username: "",
  email: "",
  user_id: "",
  loading: false,
  error: ""
};

const authReducer = (state = initState, action: any) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true
      };
    default: return state;
  }
};

export default authReducer;
