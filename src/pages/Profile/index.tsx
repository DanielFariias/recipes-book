import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../../components/Footer';
import Header from '../../components/Header';

import LocalStorageService from '../../services/LocalStorageService';

export default function Profile() {
  const [user] = useState<any>(() => LocalStorageService.get('user') ?? '');

  const history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }
  return (
    <div>
      <Header title="Profile" />

      <p>{user?.email}</p>

      <div>
        <button onClick={() => history.push('/done-recipes')} type="button">
          Done Recipes
        </button>

        <button onClick={() => history.push('/favorite-recipes')} type="button">
          Favorite Recipes
        </button>

        <button onClick={handleLogout} type="button">
          Logout
        </button>
      </div>

      <Footer />
    </div>
  );
}
