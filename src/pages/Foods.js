/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { ListRecipeCard } from '../components/ListRecipeCard';
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
      return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((res) => res.json())
        .then((json) => {
          handleAddRecipes(json.meals);
          setCategorySelected('');
        });
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCategorySelected(category);
        handleAddRecipes(json.meals);
      });
  }

  if ((recipes.length === 1) && !categorySelected) {
    history.push(`/foods/${recipes[0].idMeal}`);
  }

  return (
    <div>
      <Header title="Foods" hasSearchInput />

      <div>
        <button
          type="button"
          onClick={() => searchFoodsByCategory('all')}
        >
          All
        </button>

        {
          categories.map((category) => (
            <button
              key={category.strCategory}
              type="button"
              onClick={() => searchFoodsByCategory(category.strCategory)}
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
