/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { ListRecipeCard } from '../components/ListRecipeCard';
import { RecipesContext } from '../context/RecipesContext';

export default function Drinks() {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');
  const { recipes, handleAddRecipes } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((res) => res.json())
      .then((json) => handleAddRecipes(json.drinks));

    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((res) => res.json())
      .then((json) => setCategories(json.drinks.slice(0, 5)));
  }, []);

  if (recipes.length === 1) {
    history.push(`/drinks/${recipes[0].idDrink}`);
  }

  const firtsRecipes = recipes.slice(0, 12);

  function searchDrinksByCategory(category) {
    if (category === 'all' || category === categorySelected) {
      return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((res) => res.json())
        .then((json) => {
          handleAddRecipes(json.drinks);
          setCategorySelected('');
        });
    }

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((res) => res.json())
      .then((json) => {
        handleAddRecipes(json.drinks);
        setCategorySelected(category);
      });
  }

  return (
    <div>
      <Header title="Drinks" hasSearchInput />

      <div>
        <button
          type="button"
          onClick={() => searchDrinksByCategory('all')}
        >
          All
        </button>
        {
          categories.map((category) => (
            <button
              key={category.strCategory}
              type="button"
              onClick={() => searchDrinksByCategory(category.strCategory)}
            >
              {category.strCategory}
            </button>
          ))
        }
      </div>

      <ListRecipeCard recipes={firtsRecipes} />

      <Footer />

    </div>
  );
}
