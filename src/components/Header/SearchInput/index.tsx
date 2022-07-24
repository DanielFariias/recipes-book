import { useState, useContext, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipesContext } from '../../../context/RecipesContext';

import DrinkService from '../../../services/DrinkService';
import FoodServices from '../../../services/FoodServices';

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
      // if (!json?.meals?.length) {
      //   global.alert('Sorry, we haven\'t found any recipes for these filters.');
      // }
      switch (typeInputRadio) {
        case 'ingredient': {
          const data = await FoodServices.requestByIngredient(searchInput);
          if (!data) { return; }

          setRecipes(data);
          break;
        }
        case 'name': {
          const data = await FoodServices.requestByName(searchInput);
          if (!data) { return; }
          setRecipes(data);
          break;
        }
        case 'first-letter': {
          // if (firstLetter.length > 1) {
          //   global.alert('Your search must have only 1 (one) character');
          // }
          const data = await FoodServices.requestByFirstLetter(searchInput);
          if (!data) { return; }
          setRecipes(data);
          break;
        }
        default: {
          global.alert('aaa');
        }
      }
    } else {
      switch (typeInputRadio) {
        case 'ingredient': {
          const data = await DrinkService.requestByIngredient(searchInput);
          if (!data) { return; }
          setRecipes(data);
          break;
        }
        case 'name': {
          const data = await DrinkService.requestByName(searchInput);
          if (!data) { return; }
          setRecipes(data);
          break;
        }
        case 'first-letter': {
          const data = await DrinkService.requestByFirstLetter(searchInput);
          if (!data) { return; }
          setRecipes(data);
          break;
        }
        default: {
          global.alert('aaa');
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
        <label key={radio} htmlFor={`${radio}-search-radio`}>
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
