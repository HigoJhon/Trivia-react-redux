import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import './game.css';
import { addAssertions, addScore, fetchAPI } from '../redux/action';

class Game extends Component {
  state = {
    results: {},
    count: 0,
    arrayQuiz: [],
    answered: false,
    time: 30,
    btnNext: true,
  };

  async componentDidMount() {
    const { history } = this.props;
    const response = await fetchAPI();
    console.log(response);
    this.setState({ results: response }, this.handleQuiz);
    if (response.length === 0) {
      localStorage.clear();
      history.push('/');
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

  handleClick = ({ target }) => {
    this.setState({ 
      answered: true, 
    });
    const { dispatch } = this.props;
    const { time, results, count } = this.state;

    const red = target.id.includes('wrong');
    const checkDifficult = results[count].difficulty;
    const difficult = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    if (!red) dispatch(addAssertions(1));
    const pointBase = 10;
    const answer = red
      ? 0 : (Number(pointBase) + (Number(time) * Number(difficult[checkDifficult]))
      );
    dispatch(addScore(answer));
    console.log(answer);
  };

  decode(encoded) {
    const tempHTMLElement = document.createElement('textarea');
    tempHTMLElement.innerText = encoded;
    return tempHTMLElement.value;
  }

  nextAnswerd = () => {
    const { count } = this.state;
    const max = 3;
    const result = count > max ? 0 : count + 1;
    this.setState({
      count: result,
      answered: false,
    }, this.handleQuiz)
  }


  render() {
    const { results, count, arrayQuiz, answered, time, btnNext } = this.state;
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
        { answered && (
          <button
        data-testid="btn-next"
        onClick={ this.nextAnswerd }
        >
          Next
        </button>)}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
