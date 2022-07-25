import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { RecipeContent } from '../components/RecipeContent';
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
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((res) => res.json())
        .then((json) => {
          handleAddRecipes(json.drinks);
          setCategorySelected('');
        });
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((res) => res.json())
        .then((json) => {
          handleAddRecipes(json.drinks);
          setCategorySelected(category);
        });
    }
  }

  return (
    <RecipeContent
      title="Drinks"
      categories={categories}
      recipes={firtsRecipes}
      searchByCategory={searchDrinksByCategory}
    />
  );
}
