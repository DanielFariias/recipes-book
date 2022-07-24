/* eslint-disable consistent-return */
import { useState, useContext, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipesContext } from '../../../context/RecipesContext';

import {
  SearchDrinkByFirstLetter,
  SearchDrinkByIngredients,
  SearchDrinkByName,
  SearchFoodByFirstLetter,
  SearchFoodByIngredients,
  SearchFoodByName,
} from '../../../services/api';

const RADIO_TYPES = ['ingredient', 'name', 'first-letter'];

export function SearchInput() {
  const [searchInput, setSearchInput] = useState('');
  const [typeInputRadio, setTypeInputRadio] = useState('');
  const { setRecipes } = useContext<any>(RecipesContext);

  const location = useLocation();

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);
  }

  function handleRadioInput(event: ChangeEvent<HTMLInputElement>) {
    setTypeInputRadio(event.target.value);
  }

  async function HandleSearchFoods(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
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
    <form onSubmit={HandleSearchFoods}>
      <label htmlFor="search-input">
        What you want search?
        <input
          type="text"
          id="search-input"
          placeholder="noodle"
          onChange={handleSearchInput}
          value={searchInput}
        />
      </label>

      {RADIO_TYPES.map((radio) => (
        <label htmlFor={`${radio}-search-radio`}>
          {radio}
          <input
            type="radio"
            value={radio}
            id={`${radio}-search-radio`}
            onChange={handleRadioInput}
            checked={typeInputRadio === radio}
          />
        </label>
      ))}

      <button type="submit">
        Buscar
      </button>
    </form>

  );
}
