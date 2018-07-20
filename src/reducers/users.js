import { RECEIVE_USERS } from "../actions/users";
import { ADD_QUESTION, ADD_ANSWER } from "../actions/questions";
import { LOGOUT } from "../actions/authedUser";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ADD_QUESTION:
      const question = action.question;
      const { author, id: qid } = question;

      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([qid])
        }
      };

    case ADD_ANSWER:
      const { id, answer, authedUser } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [id]: answer
          }
        }
      };
    case LOGOUT:
      console.log("USERs reduer LOGOUT");
      return {};
    default:
      return state;
  }
}
