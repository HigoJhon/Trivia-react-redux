import { TOKEN, NAME, EMAIL, ADD_SCORE, ADD_ASSERTIONS } from '../action';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
  score: 0,
  assertions: 0,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return {
      ...state,
      token: action.payload.token,
    };
  case NAME:
    return {
      ...state,
      name: action.payload,
    };
  case EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case ADD_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };
  default: return state;
  }
};

export default user;
