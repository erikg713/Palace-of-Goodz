import { login, logout } from '../reducers/authReducer';
import { AppDispatch } from '../store';

export const loginUser = () => (dispatch: AppDispatch) => {
  dispatch(login());
};

export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(logout());
};
