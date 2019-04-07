import { GET_PROJECTS } from "../actions/action-types";

export default function projectsReducer(state = [], action) {
    switch (action.type) {
      case GET_PROJECTS:
        return action.payload;
      default:
        return state;
    }
  }