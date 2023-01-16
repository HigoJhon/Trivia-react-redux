import { TOKEN, NAME, EMAIL } from '../action';

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

  default: return state;
  }
};

export default user;
