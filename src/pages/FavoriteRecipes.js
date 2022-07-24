import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [filterType, setFilterType] = useState('all');

  function getData() {
    const doneRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setRecipes(doneRecipes);
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(recipes);

  function removeFavorite(recipe) {
    const newData = recipes.filter((item) => item.id !== recipe.id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
    setRecipes(newData);
  }

  function filterRecipe() {
    if (filterType === 'all') {
      console.log('oi');
      return recipes;
    }

    return recipes.filter((recipe) => recipe.type === filterType);
  }

  const filteredRecipes = filterRecipe();

  return (
    <div>
      <Header />

      <div>
        <button
          type="button"
          onClick={ () => setFilterType('all') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ () => setFilterType('food') }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          onClick={ () => setFilterType('drink') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>

      {recipes && filteredRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          {recipe.type === 'food'
            ? (
              <>
                <Link to={ `/foods/${recipe.id}` }>
                  <img
                    src={ recipe.image }
                    alt=""
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.nationality}
                  {' '}
                  -
                  {' '}
                  {recipe.category}
                </p>
                {/* <p data-testid={ `${index}-horizontal` }>
                </p> */}

                <Link to={ `/foods/${recipe.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>
                    {recipe.name}
                  </p>
                </Link>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {recipe.doneDate}
                </p>
                <button
                  type="button"
                  onClick={ () => {
                    copy(`http://localhost:3000/foods/${recipe.id}`);
                    setLinkCopied(true);
                  } }
                >
                  <img
                    src={ shareIcon }
                    alt=""
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                {linkCopied && (<p>Link copied!</p>)}

                <button
                  type="button"
                  onClick={ () => removeFavorite(recipe) }
                >
                  <img
                    src={ blackHeartIcon }
                    alt=""
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>

              </>
            )
            : (
              <>
                <Link to={ `/drinks/${recipe.id}` }>
                  <img
                    src={ recipe.image }
                    alt=""
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.alcoholicOrNot}
                </p>
                {/* <p data-testid={ `${index}-hori` }>

                </p> */}
                <Link to={ `/drinks/${recipe.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>
                    {recipe.name}
                  </p>
                </Link>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {recipe.doneDate}
                </p>
                <button
                  type="button"
                  onClick={ () => {
                    copy(`http://localhost:3000/drinks/${recipe.id}`);
                    setLinkCopied(true);
                  } }
                >
                  <img
                    src={ shareIcon }
                    alt=""
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>

                {linkCopied && (<p>Link copied!</p>)}

                <button
                  type="button"
                  onClick={ () => removeFavorite(recipe) }
                >
                  <img
                    src={ blackHeartIcon }
                    alt=""
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
              </>
            )}
        </div>
      ))}

    </div>
  );
}
