import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from "./_DATA";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions
    })
  );
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function saveQuestionAnswer(args) {
  return _saveQuestionAnswer(args);
}

export function fakeUserLogin(id) {
  return new Promise((res, rej) => {
    setTimeout(() => res(), 500);
  });
}

export function fakeUserLogout() {
  return new Promise((res, rej) => {
    setTimeout(() => res(), 500);
  });
}

export function getUsers() {
  return _getUsers();
}
