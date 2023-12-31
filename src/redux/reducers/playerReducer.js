import {
  SEND_LOGIN,
  ADD_SCORE,
  RESET_SCORE,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_LOGIN:
    return {
      ...state, ...action.payload,
    };
  case RESET_SCORE:
    return {
      ...state, score: 0,
    };
  case ADD_SCORE:
    console.log(state.score);
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
