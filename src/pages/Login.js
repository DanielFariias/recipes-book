import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SaveUserAtLocalStorage } from '../services/localstorage';

function isEmailValid(email) {
  // eslint-disable-next-line max-len
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}
const MIN_INPUT_PASSWORD = 6;

export default function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [InputPassword, setInputPassword] = useState('');

  const history = useHistory();

  function isValidForm() {
    if (!inputEmail) return false;

    if (isEmailValid(inputEmail) && InputPassword.length > MIN_INPUT_PASSWORD) {
      return true;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    SaveUserAtLocalStorage(inputEmail);

    history.push('/foods');
  }
  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="email-input">
        Email:
        <input
          id="email-input"
          type="email"
          data-testid="email-input"
          value={ inputEmail }
          onChange={ (e) => setInputEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password-input">
        Senha:
        <input
          id="password-input"
          type="password"
          data-testid="password-input"
          value={ InputPassword }
          onChange={ (e) => setInputPassword(e.target.value) }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !isValidForm() }
      >
        Enter
      </button>
    </form>
  );
}
