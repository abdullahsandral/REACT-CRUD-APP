import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import JOI from 'joi-browser';
import Axios from '../../Shared/Axios/Axios';
import JWTD from 'jwt-decode';

import Notification from '../../Shared/Notification/Notification';
import AuthenticationContext from '../../Shared/Context/AuthenticationContext';
import Input from '../../Shared/UI-Elements/Input';
import classes from '../Authentication.module.css';
import Spinner from '../../Shared/UI-Elements/Spinner';
import Backdrop from '../../Shared/UI-Elements/Backdrop';

const Signin = props => {

  const AuthContext = useContext(AuthenticationContext)
  const [formState, setFormState] = useState({ email: '', password: '', });
  const [errors, setErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState();
  const history = useHistory();

  const Schema = {
    email: JOI.string().required().email({ minDomainAtoms: 2 }).label("Email"),
    password: JOI.string().required().label("Password"),
  }

  const inputChangeHandler = (id, value, validator, touched) => {
    const formStateCopy = { ...formState };
    const errorsCopy = { ...errors };
    formStateCopy[id] = value;
    setFormState(formStateCopy);
    (validator.error && touched) ? errorsCopy[id] = validator.error.details[0].message : errorsCopy[id] = null
    setErrors(errorsCopy);
    const valid = JOI.validate(formStateCopy, Schema);
    !valid.error ? setFormIsValid(true) : setFormIsValid(false)
  }

  const formSubmitHandler = async e => {
    e.preventDefault();
    const body = { email: formState.email, password: formState.password }
    setLoading(true);
    try {
      const response = await Axios.post('users/login', body)
      const token = response.data.token;
      const decoded = JWTD(token)
      history.push('/dashboard')
      const expiryTime = 1000 * (decoded.exp - decoded.iat)
      const expiryDate = new Date().getTime() + expiryTime;
      AuthContext.login(decoded.id, decoded.name, token, expiryDate)

      Notification('success', 'LOGIN', 'SUCESSFULLY', 1000)
    } catch (err) {
      Notification('error', 'LOGIN', 'FAILED', 1000)
    }
    setLoading(false)
  }


  return <>
    {loading &&
      <Backdrop>
        <Spinner />
        <h2 style={{ color: 'gold' }}>Signing In</h2>
      </Backdrop>
    }
    <div className={classes.mainDiv}>
      <form onSubmit={formSubmitHandler}>
        <h3>SIGN IN</h3>
        <Input id='email' type='email' pHolder='Email' Label='Enter Your E-Mail' value={formState.email}
          min={5} max={60} onInputChange={inputChangeHandler} Schema={Schema} error={errors.email} />
        <Input id='password' type='password' pHolder='Password' Label='Enter Password' value={formState.password}
          min={1} max={50} onInputChange={inputChangeHandler}
          Schema={Schema} error={errors.password} />
        <button disabled={!formIsValid} type='submit'>SIGN IN</button>
        <p>Donot Have Account <Link to='/Signup'>SIGN UP</Link></p>
      </form>
    </div>
  </>
}

export default Signin;
