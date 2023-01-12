import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Game extends Component {
  state = {
    name: '',
    email: '',
  };

  componentDidMount() {
    const { name, email } = this.props;
    this.setState({
      name,
      email,
    });
  }

  render() {
    // const { email } = this.props;
    const { name, email } = this.state;
    const avatarGravatar = md5(email).toString();

    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${avatarGravatar}` }
            alt="avatar"
          />
          <div data-testid="header-player-name">
            { name }
          </div>
          <div>
            q
          </div>
        </header>
      </div>
    );
  }
}

Game.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
});

export default connect(mapStateToProps)(Game);
