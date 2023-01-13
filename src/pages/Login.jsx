import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { handleAPI, inputName, inputEmail } from '../redux/action';

// import handleAPI from '../redux/action';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    btnPlay: true,
  };

  handleClick = async () => {
    const { dispatch, history } = this.props;
    const { email, name } = this.state;
    dispatch(inputEmail(email));
    dispatch(inputName(name));
    await dispatch(handleAPI());
    history.push('/trivia');
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
    const valid = (
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    );
    const validation = email.match(valid)
    && name.length >= validationNumber;
    this.setState({ btnPlay: !validation });
  };

  render() {
    const { history } = this.props;
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
            type="button"
            data-testid="btn-play"
            disabled={ btnPlay }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            Config
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(Login);
