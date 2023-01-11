import React from 'react';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    btnPlay: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      btnPlay: true,
    }, () => {
      this.inputValidation();
    });
  };

  inputValidation = () => {
    const { email, name } = this.state;
    const validationNumber = 3;
    const valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validation = email.match(valid)
    && name.length >= validationNumber;
    this.setState({ btnPlay: !validation });
  };

  render() {
    const { btnPlay } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            placeholder="Digite seu nome"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            placeholder="Digite seu e-mail"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ btnPlay }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
