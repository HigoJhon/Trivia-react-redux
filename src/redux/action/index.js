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
        console.log(tokenn);
        localStorage.setItem('token', tokenn);
        // console.log(data);
        dispatch(login(data));
      });
  };
}

// export default async function handleAPI() {
//   const api = 'https://opentdb.com/api_token.php?command=request';
//   return fetch(api)
//     .then((response) => console.log(response.json());
// }
