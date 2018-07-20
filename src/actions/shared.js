import { getInitialData, fakeUserLogin } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading";

export function handleInitialData(id) {
  return dispatch => {
    dispatch(showLoading());
    fakeUserLogin().then(() => {
      dispatch(setAuthedUser(id));
      return getInitialData().then(({ users, questions }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(hideLoading());
      });
    });
  };
}
