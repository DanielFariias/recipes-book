import { useState, useContext, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';

import { RecipesContext } from '../../../context/RecipesContext';

import DrinkService from '../../../services/DrinkService';
import FoodServices from '../../../services/FoodServices';

const RADIO_TYPES = ['ingredient', 'name', 'first-letter'];

export function SearchInput() {
  const [searchInput, setSearchInput] = useState('');
  const [typeInputRadio, setTypeInputRadio] = useState('');

  const { handleAddRecipes } = useContext(RecipesContext);
  const location = useLocation();

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);
  }

  function handleRadioInput(event: ChangeEvent<HTMLInputElement>) {
    setTypeInputRadio(event.target.value);
  }

  async function requestFood() {
    if (typeInputRadio === 'ingredient') {
      const data = await FoodServices.requestByIngredient(searchInput);
      if (!data) { return; }

      handleAddRecipes(data);
    }

    if (typeInputRadio === 'name') {
      const data = await FoodServices.requestByName(searchInput);
      if (!data) { return; }
      handleAddRecipes(data);
    }

    if (typeInputRadio === 'first-letter') {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }

      const data = await FoodServices.requestByFirstLetter(searchInput);
      if (!data) { return; }
      handleAddRecipes(data);
    }
  }

  async function requestDrink() {
    if (typeInputRadio === 'ingredient') {
      const data = await DrinkService.requestByIngredient(searchInput);
      if (!data) { return; }

      handleAddRecipes(data);
    }

    if (typeInputRadio === 'name') {
      const data = await DrinkService.requestByName(searchInput);
      if (!data) { return; }
      handleAddRecipes(data);
    }

    if (typeInputRadio === 'first-letter') {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }

      const data = await DrinkService.requestByFirstLetter(searchInput);
      if (!data) { return; }
      handleAddRecipes(data);
    }
  }

  async function HandleSearchFoods(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    // if (!json?.meals?.length) {
    //   global.alert('Sorry, we haven\'t found any recipes for these filters.');
    // }

    if (location.pathname.includes('/foods')) {
      requestFood();
    } else {
      requestDrink();
    }
  }

  return (
    <form onSubmit={HandleSearchFoods}>
      <label htmlFor="search-input">
        What do you want to search?
        <input
          type="text"
          id="search-input"
          placeholder="noodle"
          onChange={handleSearchInput}
          value={searchInput}
        />
      </label>

      {RADIO_TYPES.map((radio) => (
        <label key={radio} htmlFor={`${radio}-search-radio`}>
          <span>{radio}</span>
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
