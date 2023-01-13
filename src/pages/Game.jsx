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
    right: false,
    wrong: false,
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

  handleClick = ({ target }) => {
    const { id } = target;
    if (id === 'right') {
      this.setState({ right: true });
    }
    this.setState({ wrong: true });
    if (id === 'wrong') {
      this.setState({ wrong: true });
    }
    this.setState({ right: true });
  };

  decode(encoded) {
    const tempHTMLElement = document.createElement('textarea');
    tempHTMLElement.innerText = encoded;
    return tempHTMLElement.value;
  }

  render() {
    const { results, count, arrayQuiz, right, wrong } = this.state;

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
        <div data-testid="answer-options">
          {arrayQuiz.map((a) => (
            a === results[count].correct_answer ? (
              <button
                key={ a }
                type="button"
                data-testid="correct-answer"
                id="right"
                className={ right ? 'right' : '' }
                onClick={ this.handleClick }
              >
                {this.decode(a)}
              </button>)
              : (
                <button
                  key={ a }
                  type="button"
                  data-testid={ `wrong-answer-${count}` }
                  id="wrong"
                  className={ wrong ? 'wrong' : '' }
                  onClick={ this.handleClick }
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
