import React, { useState } from 'react';
import JOI from 'joi-browser';

import classes from './Inputs.module.css';

const Input = props => {

  const [touched, setTouched] = useState();
  const { type, pHolder, max, min, value, onInputChange, id, Label, pattren, Schema, error } = props

  const validator = (id, value) => {
    const field = { [id]: value }
    const feildSchema = { [id]: Schema[id] }
    return JOI.validate(field, feildSchema);
  }

  const inputChangeHandler = e => {
    const { id, value } = e.target;
    const isValid = validator(id, value);
    onInputChange(id, value, isValid, touched);
  }
  const BlurHandler = e => {
    setTouched(true);
    const { id, value } = e.target;
    const isValid = validator(id, value);
    onInputChange(id, value, isValid, true);
  }

  const input = <input id={id} type={type} placeholder={pHolder} maxLength={max} minLength={min} pattern={pattren}
    onChange={inputChangeHandler} value={value} onBlur={BlurHandler} />

  return <div className={classes.inputDiv}>
    <label>{Label}</label>
    {input}
    {error && <p>{error}</p>}
  </div>
}
export default Input;