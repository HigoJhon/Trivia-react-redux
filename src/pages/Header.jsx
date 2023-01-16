import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, email, score, assertions } = this.props;
    const avatarGravatar = md5(email).toString();
    console.log(score);
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${avatarGravatar}` }
          alt="avatar"
        />
        <h2 data-testid="header-player-name">
          { name }
        </h2>
        <div>
          <span>SCORE:</span>
          <span data-testid="header-score">
            { score }
          </span>
        </div>
        <div>
          <span>ASSERTIONS:</span>
          <span>
            { assertions }
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  score: state.user.score,
  assertions: state.user.assertions,
});

export default connect(mapStateToProps)(Header);
