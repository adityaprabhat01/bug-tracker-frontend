import { boolean } from "yup/lib/locale";
import { CommentInterface } from "../../interface/bugInterface";
import { User } from "../../interface/userInterface";
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
  DELETE_COMMENT_SUCCESS,
  CLOSE_BUG_REQUEST,
  CLOSE_BUG_SUCCESS,
  REMOVE_MEMBER_REQUEST,
  REMOVE_MEMBER_SUCCESS,
  REMOVE_MEMBER_FAILURE,
  UPDATE_REACTIONS,
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
    isOpen: boolean,
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
    mentionId: null,
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
        mentionId,
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
          mentionId,
        },
      };
    }
    case BUG_FETCH_FAILURE: {
      const { error, message } = action.payload;
      return {
        ...state,
        loading: false,
        error: error === undefined ? message : error,
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
            body: action.payload.body,
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
    case DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        bug: {
          ...state.bug,
          comments: {
            ...state.bug.comments,
            comments: state.bug.comments.comments.filter(
              (comment: any) => comment._id !== action.payload
            ),
          },
        },
      };
    }
    case CLOSE_BUG_SUCCESS: {
      return {
        ...state,
        bug: {
          ...state.bug,
          isOpen: {
            ...state.bug.isOpen,
            isOpen: action.payload.isOpen,
          },
        },
      };
    }
    case REMOVE_MEMBER_REQUEST: {
      return {
        ...state,
        bug: {
          ...state.bug,
          members: {
            ...state.bug.members,
            loading: true,
            error: "",
          },
        },
      };
    }
    case REMOVE_MEMBER_SUCCESS: {
      return {
        ...state,
        bug: {
          ...state.bug,
          members: {
            ...state.bug.members,
            members: state.bug.members.members.filter(
              (member: User) => member.user_id !== action.payload.user_id
            ),
            loading: false,
            error: "",
          },
        },
      };
    }
    case REMOVE_MEMBER_FAILURE: {
      const { error, message } = action.payload;
      return {
        ...state,
        bug: {
          ...state.bug,
          members: {
            ...state.bug.members,
            loading: false,
            error: error === undefined ? message : error,
          },
        },
      };
    }
    case UPDATE_REACTIONS: {
      const { comment_id, index, reaction } = action.payload;
      return {
        ...state,
        bug: {
          ...state.bug,
          comments: {
            ...state.bug.comments,
            comments: state.bug.comments.comments.map(
              (comment: CommentInterface, i) =>
                comment_id === comment._id
                  ? {
                      ...comment,
                      reactions: comment.reactions.map((val, i) =>
                        i === index ? reaction : val
                      ),
                    }
                  : comment
            ),
          },
        },
      };
    }
    default:
      return state;
  }
};

export default bugReducer;
