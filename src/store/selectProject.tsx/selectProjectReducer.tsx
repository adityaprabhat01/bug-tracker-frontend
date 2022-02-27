import { selectProjectInitStateInterface } from "../../interface/projectInterface";
import {
  ADD_BUG_FAILURE,
  ADD_BUG_REQUEST,
  ADD_BUG_SUCCESS,
  ADD_MEMBER_FAILURE,
  ADD_MEMBER_REQUEST,
  ADD_MEMBER_SUCCESS,
  FETCH_SELECT_PROJECT_FAILURE,
  FETCH_SELECT_PROJECT_REQUEST,
  FETCH_SELECT_PROJECT_SUCCESS,
  REMOVE_MEMBER_FAILURE,
  REMOVE_MEMBER_REQUEST,
  REMOVE_MEMBER_SUCCESS,
  UPDATE_PROJECT_BODY_FAILURE,
  UPDATE_PROJECT_BODY_REQUEST,
  UPDATE_PROJECT_BODY_SUCCESS,
  UPDATE_PROJECT_TECHSTACK_FAILURE,
  UPDATE_PROJECT_TECHSTACK_REQUEST,
  UPDATE_PROJECT_TECHSTACK_SUCCESS,
} from "./selectProjectType";

const initState: selectProjectInitStateInterface = {
  project: {
    _id: "",
    title: "",
    body: {
      body: "",
      loading: false,
      error: "",
    },
    user: {
      name: "",
      username: "",
      user_id: "",
      _id: "",
    },
    bugs: {
      bugs: [],
      loading: false,
      error: "",
    },
    date_opened: "",
    members: {
      members: [],
      loading: false,
      error: "",
    },
    techStack: {
      techStack: [],
      loading: false,
      error: "",
    },
    mentionIdCurrent: null,
  },
  loading: true,
  error: "",
};

const selectProjectReducer = (state = initState, action: any) => {
  switch (action.type) {
    case FETCH_SELECT_PROJECT_REQUEST: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case FETCH_SELECT_PROJECT_SUCCESS: {
      const { _id, title, user, body, bugs, members, techStack, date_opened } =
        action.payload;
      return {
        ...state,
        loading: false,
        error: "",
        project: {
          ...state.project,
          _id,
          title,
          user,
          body: {
            ...state.project.body,
            body,
          },
          bugs: {
            ...state.project.bugs,
            bugs,
          },
          members: {
            ...state.project.members,
            members,
          },
          techStack: {
            ...state.project.techStack,
            techStack,
          },
          date_opened,
        },
      };
    }
    case FETCH_SELECT_PROJECT_FAILURE: {
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
        project: {
          ...state.project,
          members: {
            ...state.project.members,
            loading: true,
            error: "",
          },
        },
      };
    }
    case ADD_MEMBER_SUCCESS: {
      return {
        ...state,
        project: {
          ...state.project,
          members: {
            ...state.project.members,
            members: [...state.project.members.members, action.payload],
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
        project: {
          ...state.project,
          members: {
            ...state.project.members,
            loading: false,
            error: error === undefined ? message : error,
          },
        },
      };
    }
    case REMOVE_MEMBER_REQUEST: {
      return {
        ...state,
        project: {
          ...state.project,
          members: {
            ...state.project.members,
            loading: true,
            error: "",
          },
        },
      };
    }
    case REMOVE_MEMBER_SUCCESS: {
      return {
        ...state,
        project: {
          ...state.project,
          members: {
            ...state.project.members,
            members: state.project.members.members.filter(
              (member) => member.user_id !== action.payload.user_id
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
        project: {
          ...state.project,
          members: {
            ...state.project.members,
            loading: false,
            error: error === undefined ? message : error,
          },
        },
      };
    }
    case ADD_BUG_REQUEST: {
      return {
        ...state,
        project: {
          ...state.project,
          bugs: {
            ...state.project.bugs,
            loading: true,
            error: "",
          },
        },
      };
    }
    case ADD_BUG_SUCCESS: {
      return {
        ...state,
        project: {
          ...state.project,
          bugs: {
            ...state.project.bugs,
            bugs: [...state.project.bugs.bugs, action.payload],
            loading: false,
            error: "",
          },
        },
      };
    }
    case ADD_BUG_FAILURE: {
      const { error, message } = action.payload;
      return {
        ...state,
        project: {
          ...state.project,
          bugs: {
            ...state.project.bugs,
            loading: false,
            error: error === undefined ? message : error,
          },
        },
      };
    }
    case UPDATE_PROJECT_BODY_REQUEST: {
      return {
        ...state,
        project: {
          ...state.project,
          body: {
            ...state.project.body,
            loading: true,
            error: "",
          },
        },
      };
    }
    case UPDATE_PROJECT_BODY_SUCCESS: {
      return {
        ...state,
        project: {
          ...state.project,
          body: action.payload.body,
        },
        loading: false,
        error: "",
      };
    }
    case UPDATE_PROJECT_BODY_FAILURE: {
      const { error, message } = action.payload;
      return {
        ...state,
        project: {
          body: {
            ...state.project.body,
            loading: false,
            error: error === undefined ? message : error,
          },
        },
      };
    }
    case UPDATE_PROJECT_TECHSTACK_REQUEST: {
      return {
        ...state,
        project: {
          ...state.project,
          techStack: {
            ...state.project.techStack,
            loading: true,
            error: "",
          },
        },
      };
    }
    case UPDATE_PROJECT_TECHSTACK_SUCCESS: {
      return {
        ...state,
        project: {
          ...state.project,
          techStack: {
            ...state.project.techStack,
            techStack: action.payload.techStack,
            loading: false,
            error: "",
          },
        },
      };
    }
    case UPDATE_PROJECT_TECHSTACK_FAILURE: {
      const { error, message } = action.payload;
      return {
        ...state,
        project: {
          ...state.project,
          techStack: {
            ...state.project.techStack,
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

export default selectProjectReducer;
