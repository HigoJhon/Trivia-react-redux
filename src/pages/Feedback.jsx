import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

const three = 3;

class Feedback extends Component {
  render() {
    const { name, email, score, assertions, history } = this.props;
    const avatarGravatar = md5(email).toString();
    const inputText = assertions >= three ? 'Well Done!' : 'Could be better...';
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${avatarGravatar}` }
          alt="avatar"
        />
        <h1 data-testid="feedback-text">{inputText}</h1>
        <h3 data-testid="header-player-name">
          { name }
        </h3>
        <div>
          <span>SCORE:</span>
          <span data-testid="feedback-total-score">
            { score }
          </span>
        </div>
        <div>
          <span>ASSERTIONS:</span>
          <span data-testid="feedback-total-question">
            { assertions }
          </span>
        </div>
        <div>
          <span
            style={ { visibility: 'hidden' } }
            data-testid="header-score"
          >
            { score }
          </span>
        </div>
        <br />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/Ranking') }
        >
          Ranking
        </button>
      </header>
    );
  }
}

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
