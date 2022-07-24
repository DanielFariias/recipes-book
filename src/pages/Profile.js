import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const [user] = useState(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    console.log(data);

    return data || '';
  });
  const history = useHistory();
  return (
    <div>
      <Header />

      <p data-testid="profile-email">{user?.email}</p>

      <div>
        <button
          onClick={ () => history.push('/done-recipes') }
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes

        </button>
        <button
          onClick={ () => history.push('/favorite-recipes') }
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
          type="button"
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </div>

      <Footer />
    </div>
  );
}
