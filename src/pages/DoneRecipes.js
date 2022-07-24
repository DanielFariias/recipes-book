/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import copy from 'clipboard-copy';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [filterType, setFilterType] = useState('all');
  useEffect(() => {
    function getData() {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setRecipes(doneRecipes);
    }
    getData();
  }, []);

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
      <Header title="Done Recipes" />

      <div>
        <button
          type="button"
          onClick={() => setFilterType('all')}
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setFilterType('food')}
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          onClick={() => setFilterType('drink')}
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>

      {recipes && filteredRecipes.map((recipe, index) => (
        <div key={recipe.id}>
          {recipe.type === 'food'
            ? (
              <>
                <Link to={`/foods/${recipe.id}`}>
                  <img
                    src={recipe.image}
                    alt=""
                    data-testid={`${index}-horizontal-image`}
                  />
                </Link>
                <p data-testid={`${index}-horizontal-top-text`}>
                  {recipe.nationality}
                  {' '}
                  -
                  {' '}
                  {recipe.category}
                </p>
                {/* <p data-testid={ `${index}-horizontal` }>
                </p> */}

                <Link to={`/foods/${recipe.id}`}>
                  <p data-testid={`${index}-horizontal-name`}>
                    {recipe.name}
                  </p>
                </Link>
                <p data-testid={`${index}-horizontal-done-date`}>
                  {recipe.doneDate}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    copy(`http://localhost:3000/foods/${recipe.id}`);
                    setLinkCopied(true);
                  }}
                >
                  <img
                    src={shareIcon}
                    alt=""
                    data-testid={`${index}-horizontal-share-btn`}
                  />
                </button>
                {linkCopied && (<p>Link copied!</p>)}
                {recipe.tags.map((tag) => (
                  <p key={tag} data-testid={`${index}-${tag}-horizontal-tag`}>
                    {tag}
                  </p>
                ))}
              </>
            )
            : (
              <>
                <Link to={`/drinks/${recipe.id}`}>
                  <img
                    src={recipe.image}
                    alt=""
                    data-testid={`${index}-horizontal-image`}
                  />
                </Link>
                <p data-testid={`${index}-horizontal-top-text`}>
                  {recipe.alcoholicOrNot}
                </p>
                {/* <p data-testid={ `${index}-hori` }>

                </p> */}
                <Link to={`/drinks/${recipe.id}`}>
                  <p data-testid={`${index}-horizontal-name`}>
                    {recipe.name}
                  </p>
                </Link>
                <p data-testid={`${index}-horizontal-done-date`}>
                  {recipe.doneDate}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    copy(`http://localhost:3000/drinks/${recipe.id}`);
                    setLinkCopied(true);
                  }}
                >
                  <img
                    src={shareIcon}
                    alt=""
                    data-testid={`${index}-horizontal-share-btn`}
                  />
                </button>

                {linkCopied && (<p>Link copied!</p>)}
              </>
            )}
        </div>
      ))}

    </div>
  );
}
