import React from 'react';
import './Input.css'

export const Input = ({
  name, 
  type, 
  label, 
  value,
  valid,
  touched,
  shouldValidate,
  errorMassage, 
  onChange
}) => {
  const inputType = type || 'text'
  const htmlFor = `${inputType}-${label}`
  const cls = ['input']

  const isInvalid = () => {
    return !valid && shouldValidate && touched
  } 

  if (isInvalid()) {
    cls.push('invalid')
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{label}</label>
      <input 
        name={name}
        type={inputType} 
        id={htmlFor} 
        value={value}
        onChange={onChange}
      />
        {isInvalid()
          ? <span>{errorMassage}</span>
          : null
        }
    </div>
  );
}