import React, { useState, useContext } from 'react';
import JOI from 'joi-browser';
import Axios from '../Shared/Axios/Axios';

import AuthContext from '../Shared/Context/AuthenticationContext';
import Input from '../Shared/UI-Elements/Input';
import classes from '../Authentication/Authentication.module.css';
import Notification from '../Shared/Notification/Notification';
import Spinner from '../Shared/UI-Elements/Spinner';
import Backdrop from '../Shared/UI-Elements/Backdrop';

const Profile = props => {
  const authContext = useContext(AuthContext);

  const [updating, setUpdating] = useState(false);
  const [formState, setFormState] = useState({ handle: '', status: '', skills: [], })
  const [errors, setErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);

  const Schema = {
    handle: JOI.string().required().label("Handle"),
    skills: JOI.array().items(JOI.string().required()).label("Skills"),
    status: JOI.string().required().label("Status"),
  }

  const formValidate = formState => {
    const valid = JOI.validate(formState, Schema);
    !valid.error ? setFormIsValid(true) : setFormIsValid(false)
  }

  const inputChangeHandler = (id, value, validator, touched) => {
    const formStateCopy = { ...formState };
    const errorsCopy = { ...errors };
    formStateCopy[id] = value;
    setFormState(formStateCopy);
    (validator.error && touched) ? errorsCopy[id] = validator.error.details[0].message : errorsCopy[id] = null
    setErrors(errorsCopy);
    formValidate(formStateCopy)
  }

  const checkboxHandler = e => {
    const formStateCopy = { ...formState };
    const exist = formStateCopy.skills.find((v, i, a) => { if (v === e.target.value) { a.splice(i, 1); return true } else return false });
    if (!exist) { formStateCopy.skills.push(e.target.value); }
    setFormState(formStateCopy);
    formValidate(formStateCopy);
  }

  const formSubmitHandler = async e => {
    e.preventDefault();
    const body = { handle: formState.handle, status: formState.status, skills: formState.skills.join() }
    setUpdating(true);
    try {
      const response = await Axios.post('profile', body)
      if (response.data) { Notification('success', 'PROFILE', 'Updated Sucessfully', 1000) }
    } catch (error) {
      if (error.response.request.status === 401) { authContext.logout(); }
      Notification('error', 'PROFILE', 'Update Failed', 1000)
    };
    setUpdating(false)
  }

  const createCheckboxOrRadioInput = (type, id, name, value, label) => {
    return <>
      <input type={type} id={id} name={name} value={value} />
      <label htmlFor={id}>{label}</label> <br />
    </>
  }

  return <>
    {updating &&
      <Backdrop>
        <Spinner />
        <h2 style={{ color: 'gold' }}>UPDATING PROFILE</h2>
      </Backdrop>
    }
    <div className={classes.mainDiv}>
      <form onSubmit={formSubmitHandler}>
        <h3>EDIT PROFILE</h3>
        <Input id='handle' type='text' pHolder='Handle' Label='Enter Your Handle Stage' value={formState.handle}
          max={30} min={1} onInputChange={inputChangeHandler} Schema={Schema} error={errors.handle} />
        <fieldset>
          <legend>Favourite Languages:</legend>
          <div onChange={checkboxHandler} className={classes.fieldsetDiv}>
            {createCheckboxOrRadioInput('checkbox', 'JavaScript', 'JavaScript', 'Java Script', 'Java Script')}
            {createCheckboxOrRadioInput('checkbox', 'React', 'React', 'React', 'React JS')}
            {createCheckboxOrRadioInput('checkbox', 'Node', 'Node', 'Node', 'Node JS')}
            {createCheckboxOrRadioInput('checkbox', 'Python', 'Python', 'Python', 'Python')}
            {createCheckboxOrRadioInput('checkbox', 'C', 'C', 'C', 'C, C++')}
          </div>
        </fieldset>
        <fieldset>
          <legend>Status:</legend>
          <div className={classes.fieldsetDiv} onChange={e => inputChangeHandler('status', e.target.value, true, true)}>
            {createCheckboxOrRadioInput('radio', 'active', 'status', 'active', 'Active')}
            {createCheckboxOrRadioInput('radio', 'inactive', 'status', 'inactive', 'Inactive')}
          </div>
        </fieldset>
        <button disabled={!formIsValid} type='submit'>EDIT PROFILE</button >     </form>
    </div>
  </>
}

export default Profile;
