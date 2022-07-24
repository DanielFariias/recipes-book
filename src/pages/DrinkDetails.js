/* eslint-disable no-magic-numbers */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';

import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const styles = {
  width: '100%',
  maxWidth: 360,
};

export default function DrinkDetails() {
  const [drink, setDrink] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [recomendations, setRecomendations] = useState([]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const history = useHistory();

  const { id } = useParams();

  function isFavoritefunction() {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!storage) {
      return setIsFavorite(false);
    }
    console.log(storage);
    const isExists = storage.find((item) => item.id === id);
    console.log(isExists);

    if (isExists) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((json) => setDrink(json.drinks[0]));

    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((res) => res.json())
      .then((json) => setRecomendations(json.meals.slice(0, 6)));

    isFavoritefunction();
  }, []);

  function generateYoutubeLink(youtubeLink) {
    if (!youtubeLink) return;
    const baseEmbedURL = 'https://www.youtube.com/embed/';
    const videoId = youtubeLink.split('v=')[1];
    return `${baseEmbedURL}${videoId}`;
  }

  const ingredients = Object.entries(drink)
    .filter((item) => item[0].includes('strIngredient'))
    .filter((item) => item[1] !== null);

  const measure = Object.entries(drink)
    .filter((item) => item[0].includes('strMeasure'))
    .filter((item) => item[1] !== null);

  function saveFoodAtLocalStorage() {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!storage) {
      const data = [{
        id: drink.idDrink,
        type: 'drink',
        nationality: '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
      }];

      return localStorage.setItem('favoriteRecipes', JSON.stringify(data));
    }
    console.log(storage);

    const isExists = storage.find((item) => item.id === drink.idDrink);
    console.log(isExists);

    if (isExists) {
      const newData = storage.filter((item) => item.id !== drink.idDrink);

      return localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
    }

    const data = {
      id: drink.idDrink,
      type: 'drink',
      nationality: '',
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
    };

    const newStorage = [
      ...storage,
      data,
    ];

    return localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }

  function isDoneRecipe() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const isDone = doneRecipes.find((recipe) => recipe.id === drink.idDrink);

    console.log(isDone);
    return isDone;
  }

  function isInProgressRecipe() {
    const doneRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (!doneRecipes) {
      return false;
    }
    const isDone = doneRecipes.cocktails[drink.idDrink];

    return isDone;
  }

  return (
    <div style={ styles }>
      <img src={ drink.strDrinkThumb } alt="" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{drink.strDrink}</h1>

      <button
        type="button"
        onClick={ () => {
          saveFoodAtLocalStorage();
          isFavoritefunction();
        } }
      >
        <img
          src={ isFavorite ? blackHeart : whiteHeart }
          alt=""
          data-testid="favorite-btn"
        />

      </button>
      <button
        type="button"
        onClick={ () => {
          copy(`http://localhost:3000/drinks/${drink.idDrink}`);
          setIsLinkCopied(true);
        } }
        data-testid="share-btn"

      >
        <img
          src={ shareIcon }
          alt=""
        />
      </button>
      { isLinkCopied && <p>Link copied!</p>}

      <br />
      <br />

      <span data-testid="recipe-category">{drink.strAlcoholic}</span>

      <div>
        {ingredients.map((ingredient, index) => (
          <p
            key={ ingredient[0] }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient[1]} - ${measure[index] && measure[index][1]}`}
          </p>
        ))}
      </div>

      <p data-testid="instructions">
        {drink.strInstructions}
      </p>

      <iframe
        data-testid="video"
        src={ generateYoutubeLink(drink?.strYoutube) }
        width="300"
        height="auto"
        title={ `${drink?.strDrink} preparation` }
      />

      <section
        className="recommendations-container"
        style={ {
          width: 360,
          overflow: 'hidden',
          overflowX: 'scroll',
          display: 'flex',
          gap: 20,
        } }
      >
        {recomendations.map((recipe, index) => (
          <div
            key={ recipe.idMeal }
            data-testid={ `${index}-recomendation-card` }

          >
            <img src={ recipe.strMealThumb } alt="" width={ 200 } />
            <p data-testid={ `${index}-recomendation-title` }>{recipe.strMeal}</p>
          </div>
        ))}
      </section>

      {!isDoneRecipe() && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/drinks/${drink.idDrink}/in-progress`) }
          style={ {
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 24,
          } }
        >
          {!isInProgressRecipe() ? 'Start Recipe' : 'Continue Recipe'}
        </button>
      )}

    </div>
  );
}
