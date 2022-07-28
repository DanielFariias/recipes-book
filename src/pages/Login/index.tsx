import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LocalStorageService from '../../services/LocalStorageService';
import { isEmailValid } from '../../utils/isValidEmail';

const MIN_INPUT_PASSWORD = 6;

export default function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [InputPassword, setInputPassword] = useState('');

  const history = useHistory();

  function isValidForm() {
    if (inputEmail) {
      if (isEmailValid(inputEmail) && InputPassword.length > MIN_INPUT_PASSWORD) {
        return true;
      }
    }

    return false;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    LocalStorageService.set('user', { email: inputEmail });

    history.push('/foods');
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email-input">
        Email:
        <input
          id="email-input"
          type="email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
      </label>
      <label htmlFor="password-input">
        Senha:
        <input
          id="password-input"
          type="password"
          value={InputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
      </label>
      <button
        type="submit"
        disabled={!isValidForm()}
      >
        Enter
      </button>
    </form>
  );
}
