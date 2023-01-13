export const TOKEN = 'TOKEM';
export const NAME = 'NAME';
export const EMAIL = 'EMAIL';

export const login = (token) => ({
  type: TOKEN,
  payload: {
    ...token,
  },
});

export const inputName = (userName) => ({
  type: NAME,
  payload: userName,
});

export const inputEmail = (userEmail) => ({
  type: EMAIL,
  payload: userEmail,
});

export function handleAPI() {
  return (dispatch) => {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => {
        const tokenn = data.token.toString();
        localStorage.setItem('token', tokenn);
        dispatch(login(data));
      });
  };
}

export const fetchAPI = async () => {
  const valid = localStorage.getItem('token');
  if (!valid) return [];
  const api = await fetch(`https://opentdb.com/api.php?amount=5&token=${valid}`);
  const response = await api.json();
  return response.results;
};
