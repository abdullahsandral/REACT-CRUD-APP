import React, { useState } from 'react';

import Notification from '../Shared/Notification/Notification';
import classes from './Calculator.module.css';

const Calculator = props => {

  const Buttons = ['C', 'DEL', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];

  const [displayValue, setDisplayValue] = useState('');

  const buttonClickHandler = e => {
    const value = e.target.innerText;
    switch (value) {
      case '=':
        try {
          setDisplayValue(eval(displayValue).toString());
        } catch (error) {
          Notification('error', 'INVALID EXPRESSION', 'Please Correct Your Expression.', 3000)
        }
        return
      case 'C': setDisplayValue('');
        return;
      case 'DEL': setDisplayValue(displayValue.slice(0, displayValue.length - 1))
        return
      default: setDisplayValue(displayValue => displayValue + value);
        return
    }
  }

  const keyPressHandler = e => {
    const { key } = e;
    if (key === 'Enter') { buttonClickHandler({ target: { innerText: '=' } }); return }
    if (key === 'Backspace') { buttonClickHandler({ target: { innerText: 'X' } }); return }

    const valid = /[.%+\-*/0-9]/.test(key);
    if (!valid) return;
    buttonClickHandler({ target: { innerText: key } });
  }

  return <div className='mainDiv'>
    <div className={classes.calulator}>
      <div className={classes.display}>
        <input value={displayValue} onKeyDown={keyPressHandler} />
      </div>
      <div className={classes.Btns}>
        {Buttons.map(b => <button key={b} onClick={buttonClickHandler}><b>{b}</b></button>)}
      </div>
    </div>
  </div>

}

export default Calculator;