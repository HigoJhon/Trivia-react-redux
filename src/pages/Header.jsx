import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    const avatarGravatar = md5(email).toString();
    // console.log(avatarGravatar);
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
          <h2 data-testid="header-score">
            Total de pontos:0
          </h2>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
});

export default connect(mapStateToProps)(Header);
