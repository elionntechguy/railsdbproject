import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import AuthService from "../services/auth-service";

export const register =
  (username, email, password, password_confirmation) => (dispatch) => {
    return AuthService.register(
      username,
      email,
      password,
      password_confirmation
    ).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });

        return Promise.resolve();
      },
      (error) => {
        const message = error.message;

        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

export const login = (email, password) => async (dispatch) => {
  const data = await AuthService.login(email, password);
  if ("token" in data) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: data },
    });

    return Promise.resolve();
  } else {
    const message = data;

    dispatch({
      type: LOGIN_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    
    return Promise.reject();
  }
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};