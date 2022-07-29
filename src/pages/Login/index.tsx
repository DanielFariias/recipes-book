import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LocalStorageService from '../../services/LocalStorageService';
import { isEmailValid } from '../../utils/isValidEmail';
import * as C from './styles';

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
    <C.Container>
      <C.Header>
        <h1>Recipes Book</h1>
        <p>
          <span>Bem vindo ao seu livro de receitas</span>
          <span>Faça o login com suas credenciais</span>
        </p>
        <div />
      </C.Header>

      <C.Form onSubmit={handleSubmit}>

        <input
          id="email-input"
          type="email"
          value={inputEmail}
          placeholder="Digite seu e-mail"
          onChange={(e) => setInputEmail(e.target.value)}
        />

        <input
          id="password-input"
          placeholder="Digite sua senha"
          type="password"
          value={InputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={!isValidForm()}
        >
          Login
        </button>
      </C.Form>
    </C.Container>
  );
}
