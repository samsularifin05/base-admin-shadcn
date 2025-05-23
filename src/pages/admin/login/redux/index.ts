import {
  AppDispatch,
  AppThunk,
  formActions,
  themesActions
} from '@/reduxStore';
import { toast } from 'react-toastify';

export const serviceLogin = () => {
  const login = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const data = state.form.LoginForm;

      if (data.email === 'admin@gmail.com' && data.password === 'admin1234') {
        dispatch(formActions.resetForm('LoginForm'));
        dispatch(themesActions.setIsLogin(true));
      } else {
        toast.info('Username password salah');
      }
    };
  };

  return {
    login
  };
};
