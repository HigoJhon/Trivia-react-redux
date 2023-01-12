import { TOKEN, NAME, EMAIL } from '../action';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return {
      ...state,
      // email: action.payload,
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
