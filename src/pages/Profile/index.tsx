import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../../components/Footer';
import Header from '../../components/Header';

import LocalStorageService from '../../services/LocalStorageService';
import * as C from './styles';

export default function Profile() {
  const [user] = useState<any>(() => LocalStorageService.get('user') ?? '');

  const history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }
  return (
    <C.Container>
      <Header title="Profile" />

      <C.UserCard>
        <h2>User Email</h2>
        <p>{user?.email ?? 'email@example.com'}</p>
      </C.UserCard>

      <C.OptionsMenu>
        <button onClick={() => history.push('/done-recipes')} type="button">
          Done Recipes
        </button>

        <button onClick={() => history.push('/favorite-recipes')} type="button">
          Favorite Recipes
        </button>

        <button onClick={handleLogout} type="button">
          Logout
        </button>
      </C.OptionsMenu>

      <Footer />
    </C.Container>
  );
}
