import {
  UPDATE_LABEL_FAILURE,
  UPDATE_LABEL_REQUEST,
  UPDATE_LABEL_SUCCESS,
  ADD_MEMBER_FAILURE,
  ADD_MEMBER_REQUEST,
  ADD_MEMBER_SUCCESS,
  BUG_FETCH_FAILURE,
  BUG_FETCH_REQUEST,
  BUG_FETCH_SUCCESS,
  POST_BUG_COMMENT_FAILURE,
  POST_BUG_COMMENT_REQUEST,
  POST_BUG_COMMENT_SUCCESS,
  UPDATE_BUG_BODY_FAILURE,
  UPDATE_BUG_BODY_REQUEST,
  UPDATE_BUG_BODY_SUCCESS,
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
    comments: {
      comments: [],
      loading: false,
      error: "",
    },
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
          comments: {
            ...state.bug.comments,
            comments,
          },
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
            loading: true,
          },
        },
      };
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
          },
        },
      };
    }
    case ADD_MEMBER_FAILURE: {
      const { error, message } = action.payload;

      return {
        ...state,

        bug: {
          ...state.bug,
          members: {
            ...state.bug.members,
            error: error === undefined ? message : error,
            loading: false,
          },
        },
      };
    }
    case UPDATE_BUG_BODY_REQUEST: {
      return {
        ...state,
        bug: {
          ...state.bug,
          body: {
            ...state.bug.body,
            loading: true,
            error: "",
          },
        },
      };
    }
    case UPDATE_BUG_BODY_SUCCESS: {
      return {
        ...state,
        bug: {
          ...state.bug,
          body: {
            ...state.bug.body,
            loading: false,
            body: action.payload,
            error: "",
          },
        },
      };
    }
    case UPDATE_BUG_BODY_FAILURE: {
      const { error, message } = action.payload;
      return {
        ...state,
        bug: {
          ...state.bug,
          body: {
            ...state.bug.body,
            loading: false,
            error: error === undefined ? message : error,
          },
        },
      };
    }
    case POST_BUG_COMMENT_REQUEST: {
      return {
        ...state,
        bug: {
          ...state.bug,
          comments: {
            ...state.bug.comments,
            loading: true,
            error: "",
          },
        },
      };
    }
    case POST_BUG_COMMENT_SUCCESS: {
      return {
        ...state,
        bug: {
          ...state.bug,
          comments: {
            ...state.bug.comments,
            loading: false,
            error: "",
            comments: [...state.bug.comments.comments, action.payload],
          },
        },
      };
    }
    case POST_BUG_COMMENT_FAILURE: {
      const { error, message } = action.payload;
      return {
        ...state,
        bug: {
          ...state.bug,
          comments: {
            ...state.bug.comments,
            loading: false,
            error: error === undefined ? message : error,
          },
        },
      };
    }
    case UPDATE_LABEL_REQUEST: {
      return {
        ...state,
        bug: {
          ...state.bug,
          labels: {
            ...state.bug.labels,
            loading: true,
            error: "",
          },
        },
      };
    }
    case UPDATE_LABEL_SUCCESS: {
      return {
        ...state,
        bug: {
          ...state.bug,
          labels: {
            ...state.bug.labels,
            loading: false,
            error: "",
            labels: action.payload.labels,
          },
        },
      };
    }
    case UPDATE_LABEL_FAILURE: {
      const { error, message } = action.payload;
      return {
        ...state,
        bug: {
          ...state.bug,
          labels: {
            ...state.bug.labels,
            loading: false,
            error: error === undefined ? message : error,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default bugReducer;
