import {
  ADD_MEMBER_FAILURE,
  ADD_MEMBER_REQUEST,
  ADD_MEMBER_SUCCESS,
  BUG_FETCH_FAILURE,
  BUG_FETCH_REQUEST,
  BUG_FETCH_SUCCESS,
} from "./bugType";

const initState = {
  bug: {
    title: "",
    body: {
      body: "",
      loading: false,
      error: "",
    },
    dateOpen: "",
    isOpen: {
      isOpen: false,
      loading: false,
      error: "",
    },
    project_id: "",
    _id: "",
    user: {
      name: "",
      username: "",
      _id: "",
      user_id: "",
    },
    comments: [],
    members: {
      members: [],
      loading: false,
      error: "",
    },
    labels: {
      labels: [],
      loading: false,
      error: "",
    },
  },
  loading: false,
  error: "",
};

const bugReducer = (state = initState, action: any) => {
  switch (action.type) {
    case BUG_FETCH_REQUEST: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case BUG_FETCH_SUCCESS: {
      const {
        title,
        body,
        dateOpen,
        isOpen,
        project_id,
        _id,
        user,
        comments,
        members,
        labels,
      } = action.payload;
      return {
        ...state,
        loading: false,
        error: "",
        bug: {
          ...state.bug,
          title,
          body: {
            ...state.bug.body,
            body,
          },
          dateOpen,
          isOpen: {
            ...state.bug.isOpen,
            isOpen,
          },
          project_id,
          _id,
          user,
          comments,
          members: {
            ...state.bug.members,
            members,
          },
          labels: {
            ...state.bug.labels,
            labels,
          },
        },
      };
    }
    case BUG_FETCH_FAILURE: {
      return {
        ...state,
        loading: false,
        error: "",
      };
    }
    case ADD_MEMBER_REQUEST: {
      return {
        ...state,
        bug: {
          ...state.bug,
          members: {
            ...state.bug.members,
            loading: true
          }
        },
      }
    }
    case ADD_MEMBER_SUCCESS: {
      return {
        ...state,
        bug: {
          ...state.bug,
          members: {
            ...state.bug.members,
            members: [...state.bug.members.members, action.payload],
            loading: false,
            error: "",
          }
        }
      }
    }
    case ADD_MEMBER_FAILURE: {
      const { error, message } = action.payload;
      
      return {
        ...state,
        
        bug: {
          ...state.bug,
          members: {
            ...state.bug.members,
            error: error === undefined ? message: error,
            loading: false,
          }
        },
        
      }
    }
    default:
      return state;
  }
};

export default bugReducer;
