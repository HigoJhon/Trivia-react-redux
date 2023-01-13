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

  render() {
    const { results, count, arrayQuiz } = this.state;
    console.log(results);

    return (
      <>
        <Header />
        {
          results.length > 0 && (
            <>
              <p>{results[count].category}</p>
              <p>{results[count].question}</p>
            </>
          )
        }
        <div>
          {arrayQuiz.map((a, index) => {
            const valor = arrayQuiz.indexOf(results[count].correct_answers);
            return index === valor ? (
              <button
                key={ index }
                type="button"
                data-testing="correct-answer"
              >
                {a}

              </button>)
              : (
                <button
                  key={ index }
                  type="button"
                  data-testing={ `wrong-answer-${count}` }
                >
                  {a}
                </button>

              );
          })}
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
