import { fakeUserLogout } from "../utils/api";

export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGOUT = "LOGOUT";

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id
  };
}
export function logout() {
  return {
    type: LOGOUT
  };
}

export function handleUserLogout() {
  return dispatch => {
    fakeUserLogout().then(() => {
      dispatch(logout());
    });
  };
}
