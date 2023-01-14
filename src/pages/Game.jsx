import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import './game.css';
import { fetchAPI } from '../redux/action';

class Game extends Component {
  state = {
    results: [],
    count: 0,
    arrayQuiz: [],
    answered: false,
    time: 30,
  };

  async componentDidMount() {
    const { history } = this.props;
    const response = await fetchAPI();
    console.log(response);
    if (response.length === 0) {
      localStorage.clear();
      history.push('/');
    } else {
      this.setState({ results: response }, this.handleQuiz);
    }
  }

  shouldComponentUpdate() {
    const { time } = this.state;
    const ondeSecond = 500;
    return time > 0 && setTimeout(() => this.setState({ time: time - 1 }), ondeSecond);
  }

  handleQuiz = () => {
    const { results, count } = this.state;
    const array = [results[count].correct_answer,
      ...results[count].incorrect_answers];
    const random = [];
    array.forEach((a) => {
      random.splice(Math.floor(Math.random() * array.length), 0, a);
    });
    this.setState({ arrayQuiz: random });
  };

  handleClick = () => {
    this.setState({ answered: true });
  };

  decode(encoded) {
    const tempHTMLElement = document.createElement('textarea');
    tempHTMLElement.innerText = encoded;
    return tempHTMLElement.value;
  }

  render() {
    const { results, count, arrayQuiz, answered, time } = this.state;

    return (
      <div className="game">
        <Header />
        {
          results.length > 0 && (
            <>
              <p data-testid="question-category">{results[count].category}</p>
              <p data-testid="question-text">{this.decode(results[count].question)}</p>
            </>
          )
        }
        {
          time
        }
        <div data-testid="answer-options">
          {arrayQuiz.map((a) => (
            a === results[count].correct_answer ? (
              <button
                key={ a }
                type="button"
                data-testid="correct-answer"
                id="right"
                className={ answered ? 'right' : '' }
                onClick={ this.handleClick }
                disabled={ !time }
              >
                {this.decode(a)}
              </button>)
              : (
                <button
                  key={ a }
                  type="button"
                  data-testid={ `wrong-answer-${count}` }
                  id="wrong"
                  className={ answered ? 'wrong' : '' }
                  onClick={ this.handleClick }
                  disabled={ !time }
                >
                  {this.decode(a)}
                </button>
              )
          ))}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
