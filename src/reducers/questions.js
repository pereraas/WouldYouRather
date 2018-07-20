import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  ADD_ANSWER
} from "../actions/questions";

import { LOGOUT } from "../actions/authedUser";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      };
    case ADD_ANSWER:
      const { id, answer: option, authedUser } = action;
      return {
        ...state,
        [id]: {
          ...state[id],
          [option]: {
            ...state[id][option],
            votes: [...state[id][option].votes.concat([authedUser])]
          }
        }
      };
    case LOGOUT:
      return {};

    default:
      return state;
  }
}
