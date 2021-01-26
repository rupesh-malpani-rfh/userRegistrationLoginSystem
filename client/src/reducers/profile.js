import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";

const initialState = {
  profile: null,
  error: {},
  repos: [],
  loading: false,
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        profile: null,
      };
    // case CLEAR_PROFILE:
    //   return {
    //     ...state,
    //     profile: null,
    //     repos: [],
    //   };
    default:
      return state;
  }
}

export default profileReducer;
