import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { fetchAPI } from '../redux/action';

class Game extends Component {
  state = {
    results: [],
    count: 0,
    arrayQuiz: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const response = await fetchAPI();
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

  decode(encoded) {
    const tempHTMLElement = document.createElement('textarea');
    tempHTMLElement.innerText = encoded;
    return tempHTMLElement.value;
  }

  render() {
    const { results, count, arrayQuiz } = this.state;

    return (
      <>
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
          {arrayQuiz.map((a, index) => (
            a === results[count].correct_answer ? (
              <button
                key={ index }
                type="button"
                data-testid="correct-answer"
              >
                {this.decode(a)}
              </button>)
              : (
                <button
                  key={ index }
                  type="button"
                  data-testid={ `wrong-answer-${count}` }
                >
                  {this.decode(a)}
                </button>
              )
          ))}
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
