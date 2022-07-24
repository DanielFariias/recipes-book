/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { RecipesContext } from '../context/RecipesContext';

export default function Foods() {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');

  const { recipes, setRecipes } = useContext(RecipesContext);
  const history = useHistory();
  console.log(recipes);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((res) => res.json())
      .then((json) => setRecipes(json.meals));

    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((res) => res.json())
      .then((json) => setCategories(json.meals.slice(0, 5)));
  }, []);

  function searchFoodsByCategory(category) {
    if (category === 'all' || category === categorySelected) {
      return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((res) => res.json())
        .then((json) => {
          setRecipes(json.meals);
          setCategorySelected('');
        });
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCategorySelected(category);
        setRecipes(json.meals);
      });
  }

  if ((recipes.length === 1) && !categorySelected) {
    history.push(`/foods/${recipes[0].idMeal}`);
  }

  const firtsRecipes = recipes.slice(0, 12);

  return (
    <div>
      <Header title="Foods" hasSearchInput />

      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={() => searchFoodsByCategory('all')}
        >
          All
        </button>

        {
          categories.map((category) => (
            <button
              key={category.strCategory}
              type="button"
              data-testid={`${category.strCategory}-category-filter`}
              onClick={() => searchFoodsByCategory(category.strCategory)}
            >
              {category.strCategory}
            </button>
          ))
        }
      </div>

      {
        firtsRecipes.map((recipe, index) => (
          <Link key={recipe.idMeal} to={`/foods/${recipe.idMeal}`}>
            <div data-testid={`${index}-recipe-card`}>
              <img
                src={recipe.strMealThumb}
                alt=""
                data-testid={`${index}-card-img`}
              />
              <span data-testid={`${index}-card-name`}>{recipe.strMeal}</span>
            </div>
          </Link>
        ))
      }

      <Footer />
    </div>
  );
}
