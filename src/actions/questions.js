import { saveQuestion, saveQuestionAnswer } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}
function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

function saveAnswer(id, answer, authedUser) {
  return {
    type: ADD_ANSWER,
    id,
    answer,
    authedUser
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    saveQuestion({
      optionOneText,
      optionTwoText,
      author: getState().authedUser
    }).then(question => {
      dispatch(addQuestion(question));
    });
  };
}

export function handleAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    saveQuestionAnswer({
      authedUser,
      qid,
      answer
    }).then(() => {
      dispatch(saveAnswer(qid, answer, authedUser));
    });
  };
}
