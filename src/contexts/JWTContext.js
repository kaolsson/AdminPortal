import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { authApi } from '../__fakeApi__/authApi';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  UPDATE: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  PASSWORD_RECOVERY: (state) => ({ ...state }),
  PASSWORD_RESET: (state) => ({ ...state }),
  VERIFY_CODE: (state) => ({ ...state }),
  RESEND_CODE: (state) => ({ ...state })
};

const reducer = (state, action) => (handlers[action.type]
  ? handlers[action.type](state, action)
  : state);

const AuthContext = createContext({
  ...initialState,
  platform: 'JWT',
  login: () => Promise.resolve(),
  update: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  passwordRecovery: () => Promise.resolve(),
  passwordReset: () => Promise.resolve(),
  verifyCode: () => Promise.resolve(),
  resendCode: () => Promise.resolve()
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken) {
          const user = await authApi.me(accessToken);

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const accessToken = await authApi.login({ email, password });
    const user = await authApi.me(accessToken);
    localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
  };

  const update = (updateType, updatedUser) => (
    new Promise((resolve, reject) => {
      (async () => {
        try {
          const user = await authApi.update(updateType, updatedUser);
          dispatch({
            type: 'UPDATE',
            payload: {
              user
            }
          });
          resolve(user);
        } catch (e) {
          console.error(e);
          reject(new Error(e));
        }
      })();
    })
  );

  const logout = async () => {
    localStorage.removeItem('accessToken');
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (email, name, password) => {
    const accessToken = await authApi.register({ email, name, password });
    const user = await authApi.me(accessToken);

    localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const passwordRecovery = async (username) => {
    await authApi.forgotPassword(username);
    dispatch({
      type: 'PASSWORD_RECOVERY'
    });
  };

  const passwordReset = async (username, code, newPassword) => {
    await authApi.forgotPasswordSubmit(username, code, newPassword);
    dispatch({
      type: 'PASSWORD_RESET'
    });
  };

  const resendCode = async (username) => {
    await authApi.resendSignUp(username);
    dispatch({
      type: 'RESEND_CODE'
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'JWT',
        login,
        update,
        logout,
        register,
        passwordRecovery,
        passwordReset,
        resendCode
        // verifyCode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;
