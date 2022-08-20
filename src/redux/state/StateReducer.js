import { INCREMENT, DECREMENT, SETVAL } from "./StateType";

const initialState = {
  page: localStorage.getItem('page')?parseInt(localStorage.getItem('page')):1,
};

const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        page: state.page+1,
      };
    case DECREMENT:
      return {
        ...state,
        page: state.page-1,
      };
	case SETVAL:
		return{
			...state,
			page: action.payload
		}
    default:
        return state;
  }
};

export default stateReducer;
