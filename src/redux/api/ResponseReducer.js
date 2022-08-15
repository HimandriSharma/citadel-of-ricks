import {
  FETCH_API_FAILURE,
  FETCH_API_REQUEST,
  FETCH_API_SUCESS,
} from "./ResponseTypes";

const initialState = {
  loading: false,
  characters: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_API_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_API_SUCESS:
      return {
        loading: false,
        characters: action.payload,
        error: "",
      };
    case FETCH_API_FAILURE:
      return {
        loading: false,
        characters: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default reducer