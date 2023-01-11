import { TOKEN } from '../action';

const INITIAL_STATE = {
  name: '',
  email: '',
  // token: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return {
      email: action.payload,
      // token: action.payload.token,
    };
  default: return state;
  }
};

export default user;
