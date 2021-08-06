import React, { useState } from 'react';
import { Input } from '../Input/Input'
import './Auth.css'

export const Auth = () => {
  const formControls = {
    firstName:{
      value: '',
      type: '',
      label: 'First Name',
      errorMassage: 'Введите корректное имя',
      valid: false,
      touched: false,
      validation: {
          required: true,
          minLength: 3
      }
    },
    secondName:{
      value: '',
      type: '',
      label: 'Second Name',
      errorMassage: 'Введите корректную фамилию',
      valid: false,
      touched: false,
      validation: {
          required: true,
          minLength: 3
      }
    },
    phoneNumber:{
      value: '',
      type: 'tel',
      label: 'Phone number',
      errorMassage:'Введите номер телефона (не менее 10 символов)',
      valid: false,
      touched: false,
      validation: {
          required: true,
          minLength: 10
      }
    },
    email:{
      value: '',
      type: 'email',
      label: 'Email',
      errorMassage:'Введите корректный email',
      valid: false,
      touched: false,
      validation: {
          required: true,
          email: true
      }
    },
    password:{
        value: '',
        type: 'password',
        label: 'Password',
        errorMassage:'Введите корректный пароль (не менее 8 символов)',
        valid: false,
        touched: false,
        validation: {
            required: true,
            minLength: 8
        }
    }
  }

  const [stateInput, setIsInput] = useState(formControls)

  const validateEmail= (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  const checkValidForm = Object.values(stateInput).every(({ valid }) => valid === true);

  const validateControl = (value, validation) => {
    if (!validation) {
      return true
    }

    let isValid = true

    if(validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if(validation.email) {
      isValid = validateEmail(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.trim().length >= validation.minLength && isValid
    }

    return isValid
  }

  const onChangeHandler = event => {
    const newValue = event.target.value
    const changedInput = event.target.getAttribute('name')
    const customState = {
      ...stateInput,
      [changedInput]: {
        ...stateInput[changedInput]
      }
    }
    const validation = {...customState[changedInput]}

    const newFormState = {
      ...stateInput,
      [changedInput]: {
        ...stateInput[changedInput],
        value: newValue,
        touched: true,
        valid: validateControl(newValue, {...validation}.validation)
      }
    }

    setIsInput(newFormState)
  }

  const renderInputs = () => {
    return ( Object
    .keys(stateInput)
    .map((controlName, index) => {
    const control = stateInput[controlName]

    return(<Input 
        key={controlName + index}
        name={controlName}
        type={control.type}
        label={control.label}
        value={control.value}
        valid={control.valid}
        touched={control.touched}
        shouldValidate={!!control.validation}
        errorMassage={control.errorMassage}
        onChange={onChangeHandler}
    />)
    })
  )}

  const submitHandler = event => {
    event.preventDefault()
  }

  return (
    <div className="auth">
      <h1>Validation Form</h1>
      <form onSubmit={submitHandler}>
        {renderInputs()}
      </form>
      <button disabled={!checkValidForm}>Submit</button>
    </div>
)}