import React, { useState, useEffect } from 'react';

import AuthenticatedRoutes from './Routes/AuthenticatedRoutes';
import UnAuthenticatedRoutes from './Routes/UnAuthenticatedRoutes';
import AuthContext from './Shared/Context/AuthenticationContext';
import './App.css';
import Notification from './Shared/Notification/Notification';

const App = () => {

  const [token, setToken] = useState();
  const [userID, setUserID] = useState();
  const [userName, setUserName] = useState('CRUD APP');
  const [tokenExpDate, setTokenExpDate] = useState();

  const login = (id, name, token, expDate) => {
    setToken(token);
    setUserID(id);
    setUserName(name);
    const expiryDate = expDate;
    setTokenExpDate(expiryDate);
    localStorage.setItem('USER_DATA', JSON.stringify({ userID: id, userName: name, expiryDate, token }));
  }
  const logout = () => {
    setUserID(null);
    setUserName('CRUD APP');
    setToken(null);
    localStorage.removeItem('USER_DATA');
  }

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('USER_DATA'));
    const expired = new Date() > new Date(storedData?.expiryDate);
    if (storedData && !expired) login(storedData.userID, storedData.userName, storedData.token, storedData.expiryDate)
    else logout()
  }, [])

  useEffect(() => {
    let Timer;
    if (tokenExpDate) {
      const remainingTime = tokenExpDate - new Date().getTime();
      Timer = setTimeout(() => { logout(); Notification('success', 'SESSION EXPIRED', 'Your session has been expired.', 3000) }, remainingTime);
    }
    return () => { if (Timer) clearTimeout(Timer); }
  }, [tokenExpDate])

  return <AuthContext.Provider value={{ loggedIn: !!token, userId: userID, userName: userName, userToken: token, login: login, logout: logout }}>
    {token ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
  </AuthContext.Provider>

}

export default App;