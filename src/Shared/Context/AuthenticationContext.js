import { createContext } from 'react';

const AuthenticationContext = createContext(
  {
    loggedIn: false,
    userId: null,
    userToken: null,
    userName: null,
    login: () => { },
    logout: () => { },
  }
)

export default AuthenticationContext;