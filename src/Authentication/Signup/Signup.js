import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import JOI from 'joi-browser';

import Notification from '../../Shared/Notification/Notification';
import Input from '../../Shared/UI-Elements/Input';
import classes from '../Authentication.module.css';
import Axios from '../../Shared/Axios/Axios';

const Signup = props => {
  const [formState, setFormState] = useState({ fName: '', lName: '', email: '', password: '', })
  const [errors, setErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const history = useHistory();

  const Schema = {
    fName: JOI.string().required().label("First Name"),
    lName: JOI.string().required().label("Last Name"),
    email: JOI.string().required().email({ minDomainAtoms: 2 }).label("Email"),
    password: JOI.string().required().min(6).label("Password").regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)
      .error(() => ({ message: 'Password Should Contain Atleast 1 Capital, 1 Small Letter, 1 Digit and 1 Special Character and atleast 6 Chracters.' })),
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
    const body = { name: formState.fName + ' ' + formState.lName, email: formState.email, password: formState.password }
    try {
      await Axios.post('users/signup', body);
      Notification('success', 'SIGN UP', 'SUCESSFULLY', 1000);
      history.push('/login')
    } catch (err) {
      Notification('error', 'SIGN UP', 'FAILED', 1000)
    }
  }

  return <>
    <div className={classes.mainDiv}>

      <form onSubmit={formSubmitHandler}>
        <h3>SIGN UP</h3>
        <Input id='fName' type='text' pHolder='First Name' Label='Enter Your First Name' value={formState.fName}
          max={30} min={1} onInputChange={inputChangeHandler} Schema={Schema} error={errors.fName} />
        <Input id='lName' type='text' pHolder='Last Name' Label='Enter Your Last Name' value={formState.lName}
          max={30} min={1} onInputChange={inputChangeHandler} Schema={Schema} error={errors.lName} />
        <Input id='email' type='email' pHolder='Email' Label='Enter Your E-Mail' value={formState.email}
          min={5} max={60} onInputChange={inputChangeHandler} Schema={Schema} error={errors.email} />
        <Input id='password' type='password' pHolder='Password' Label='Enter Password' value={formState.password}
          min={4} max={50} onInputChange={inputChangeHandler}
          Schema={Schema} error={errors.password} />
        <button disabled={!formIsValid} type='submit'>SIGN UP</button>
        <p>Already Have Account <Link to='/Signin'>SIGN IN</Link></p>
      </form>
    </div>
  </>
}

export default Signup;
