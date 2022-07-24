/* eslint-disable consistent-return */
import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';

import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import {
  SearchDrinkByFirstLetter,
  SearchDrinkByIngredients,
  SearchDrinkByName,
  SearchFoodByFirstLetter,
  SearchFoodByIngredients,
  SearchFoodByName,
} from '../../services/api';

interface HeaderProps {
  title: string
  hasSearchInput: boolean
}

export default function Header({ title, hasSearchInput }: HeaderProps) {
  const [ToggleSerach, setToggleSerach] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [typeInputRadio, setTypeInputRadio] = useState('');

  const { setRecipes } = useContext<any>(RecipesContext);

  const location = useLocation();

  async function HandleSearchFoods() {
    if (location.pathname.includes('/foods')) {
      switch (typeInputRadio) {
        case 'ingredient': {
          const data = await SearchFoodByIngredients(searchInput);
          if (!data) { return; }

          return setRecipes(data);
        }
        case 'name': {
          const data = await SearchFoodByName(searchInput);
          if (!data) { return; }
          return setRecipes(data);
        }
        case 'first-letter': {
          const data = await SearchFoodByFirstLetter(searchInput);
          if (!data) { return; }
          return setRecipes(data);
        }
        default: {
          console.log('aaa');
        }
      }
    } else {
      switch (typeInputRadio) {
        case 'ingredient': {
          const data = await SearchDrinkByIngredients(searchInput);
          if (!data) { return; }
          return setRecipes(data);
        }
        case 'name': {
          const data = await SearchDrinkByName(searchInput);
          if (!data) { return; }
          return setRecipes(data);
        }
        case 'first-letter': {
          const data = await SearchDrinkByFirstLetter(searchInput);
          if (!data) { return; }
          return setRecipes(data);
        }
        default: {
          console.log('aaa');
        }
      }
    }
  }

  return (
    <header>
      <Link to="/profile">
        <img src={profileIcon} alt="" data-testid="profile-top-btn" />
      </Link>

      <h1 data-testid="page-title">
        {title}
      </h1>

      <button type="button" onClick={() => setToggleSerach((state) => !state)}>
        <img src={searchIcon} alt="" data-testid="search-top-btn" />
      </button>

      {hasSearchInput && (
        <div>
          {ToggleSerach && (
          <>
            <label htmlFor="search-input">
              pesquisar
              <input
                type="text"
                id="search-input"
                data-testid="search-input"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
            </label>
            <label htmlFor="ingredient-search-radio">
              Ingredient
              <input
                type="radio"
                value="ingredient"
                id="ingredient-search-radio"
                data-testid="ingredient-search-radio"
                onChange={() => setTypeInputRadio('ingredient')}
                checked={typeInputRadio === 'ingredient'}
              />
            </label>
            <label htmlFor="name-search-radio">
              Name
              <input
                type="radio"
                value="name"
                id="name-search-radio"
                data-testid="name-search-radio"
                onChange={() => setTypeInputRadio('name')}
                checked={typeInputRadio === 'name'}
              />
            </label>
            <label htmlFor="first-letter-search-radio">
              First Letter
              <input
                type="radio"
                value="first-letter"
                id="first-letter-search-radio"
                data-testid="first-letter-search-radio"
                onChange={() => setTypeInputRadio('first-letter')}
                checked={typeInputRadio === 'first-letter'}
              />
            </label>
            <button
              data-testid="exec-search-btn"
              type="button"
              onClick={HandleSearchFoods}
            >
              Buscar
            </button>
          </>
          )}
        </div>
      )}

    </header>
  );
}
