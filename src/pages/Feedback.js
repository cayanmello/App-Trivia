import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { requestImage } from '../services/API';
import { saveLocalStorage, getLocalStorage } from '../services/LocalStorage';
import { resetScore } from '../redux/actions';
import '../style/Feedback.css';

export class Feedback extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking2 = getLocalStorage('ranking');

    this.setState({
      ranking: ranking2 || [],
    }, () => (
      this.setPlayerLocalStorage()
    ));
  }

  setPlayerLocalStorage = () => {
    const { player } = this.props;
    const image = requestImage(player);
    const objPlayer = {
      name: player.name,
      score: player.score,
      picture: image,
    };
    this.setState(({ ranking }) => ({
      ranking: [...ranking, objPlayer],
    }), () => {
      const { ranking } = this.state;
      saveLocalStorage('ranking', ranking);
    });
  };

  redirectLogin = () => {
    const { history } = this.props;
    history.push('/');
    const { dispatch } = this.props;
    dispatch(resetScore());
  };

  renderFeedback = () => {
    const THREE = 3;
    const { player } = this.props;
    if (player.assertions < THREE) {
      return 'Could be better...';
    }
    return 'Well Done!';
  };

  redirectRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { player } = this.props;
    return (
      <div className="feedback-container">
        <Header />
        <div className="feedback-wrapper">
          <h3 className="feedback-score">
            Um total de
            {' '}
            <span data-testid="feedback-total-score">{player.score}</span>
            {' '}
            pontos
          </h3>
          <h3 className="feedback-question">
            Você acertou
            {' '}
            <span
              data-testid="feedback-total-question"
            >
              {player.assertions}
            </span>
            {' '}
            questões!
          </h3>
          <p
            data-testid="feedback-text"
            className="feedback-text"
          >
            {this.renderFeedback()}
          </p>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.redirectLogin }
            className="btn-play-again"
          >
            Play again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.redirectRanking }
            className="btn-ranking"
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}
const { objectOf } = PropTypes;

Feedback.propTypes = {
  player: objectOf.isRequired,
  history: PropTypes.objectOf.isRequired,
  dispatch: PropTypes.objectOf.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Feedback);
