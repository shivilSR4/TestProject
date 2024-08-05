import React from 'react';
import './Custominput.css';

function Custominput({ type, onblur, onchange, label, value, name }) {
  return (
    <div className={`common-input-box ${value ? 'has-value' : ''}`}>
      <input
        type={type}
        className='common-input'
        value={value}
        name={name}
        onChange={onchange}
        onBlur={onblur}
      />
      <label>{label}</label>
    </div>
  );
}

export default Custominput;
