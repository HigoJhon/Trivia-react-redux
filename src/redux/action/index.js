export const TOKEN = 'TOKEM';

export const login = (payload) => ({
  type: TOKEN,
  payload,
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
