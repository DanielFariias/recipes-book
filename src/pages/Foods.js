import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { RecipeContent } from '../components/RecipeContent';
import { RecipesContext } from '../context/RecipesContext';

export default function Foods() {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');
  const { recipes, handleAddRecipes } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((res) => res.json())
      .then((json) => handleAddRecipes(json.meals));

    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((res) => res.json())
      .then((json) => setCategories(json.meals.slice(0, 5)));
  }, []);

  const firtsRecipes = recipes.slice(0, 12);

  function searchFoodsByCategory(category) {
    if (category === 'all' || category === categorySelected) {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((res) => res.json())
        .then((json) => {
          handleAddRecipes(json.meals);
          setCategorySelected('');
        });
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((res) => res.json())
        .then((json) => {
          setCategorySelected(category);
          handleAddRecipes(json.meals);
        });
    }
  }

  if ((recipes.length === 1) && !categorySelected) {
    history.push(`/foods/${recipes[0].idMeal}`);
  }

  return (
    <RecipeContent
      title="Foods"
      categories={categories}
      recipes={firtsRecipes}
      searchByCategory={searchFoodsByCategory}
    />
  );
}
