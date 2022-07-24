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

export default function DrinkProgress() {
  const [drink, setDrink] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [completedIngredients, setCompletedIngredients] = useState([]);
  console.log(drink);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`)
      .then((res) => res.json())
      .then((json) => setDrink(json.drinks[0]));

    function localstoragee() {
      const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (!storage) {
        const data = {
          cocktails: {
            [params.id]: [],
          },
          meals: {},
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(data));
        return [];
      }

      const isExists = storage.cocktails[params.id];

      if (isExists) {
        return storage.cocktails[params.id];
      }

      const data = {
        ...storage,
        cocktails: {
          ...storage.cocktails,
          [params.id]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(data));
      return [];
    }
    const aa = localstoragee();
    setCompletedIngredients(aa);
    isFavoritefunction();
  }, []);

  function isFavoritefunction() {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!storage) {
      return setIsFavorite(false);
    }
    console.log(storage);
    const isExists = storage.find((item) => item.id === params.id);
    console.log(isExists);

    if (isExists) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }

  function handleCheckInput(ingredient) {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const cocktail = [...storage.cocktails[params.id]];

    const isExist = storage.cocktails[params.id]
      .filter((item) => item.includes(ingredient[1]));

    if (isExist.length) {
      const newItem = cocktail.filter((item) => item !== ingredient[1]);
      const newStorage = {
        ...storage,
        cocktails: {
          ...storage.cocktails,
          [params.id]: newItem,
        },
      };

      setCompletedIngredients(newItem);
      return localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
    }
    cocktail.push(ingredient[1]);

    const newStorage = {
      ...storage,
      cocktails: {
        ...storage.cocktails,
        [params.id]: cocktail,
      },
    };
    setCompletedIngredients(cocktail);
    return localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  }
  function finishRecipe() {
    const recipe = {
      id: drink.idDrink,
      type: 'drink',
      nationality: '',
      category: '',
      alcoholicOrNot: drink.strCategory,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
      doneDate: new Date(),
      tags: [],
    };

    const storage = JSON.parse(localStorage.getItem('doneRecipes'));

    if (!storage) {
      localStorage.setItem('doneRecipes', JSON.stringify([recipe]));
      return history.push('/done-recipes');
    }

    const newStorage = [
      ...storage,
      recipe,
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(newStorage));

    history.push('/done-recipes');
  }

  const ingredients = Object.entries(drink)
    .filter((item) => item[0].includes('strIngredient'))
    .filter((item) => (item[1] !== '' && item[1] !== null));

  const measure = Object.entries(drink)
    .filter((item) => item[0].includes('strMeasure'))
    .filter((item) => (item[1] !== '' && item[1] !== null));

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

  return (
    <div style={styles}>
      <img src={drink.strDrinkThumb} alt="" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{drink.strDrink}</h1>

      <button
        type="button"
        onClick={() => {
          saveFoodAtLocalStorage();
          isFavoritefunction();
        }}
      >
        <img
          src={isFavorite ? blackHeart : whiteHeart}
          alt=""
          data-testid="favorite-btn"
        />

      </button>
      <button
        type="button"
        onClick={() => {
          copy(`http://localhost:3000/drinks/${drink.idDrink}`);
          setIsLinkCopied(true);
        }}
        data-testid="share-btn"

      >
        <img
          src={shareIcon}
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
            key={ingredient[0]}
            data-testid={`${index}-ingredient-name-and-measure`}
          >
            <label
              data-testid={`${index}-ingredient-step`}
              htmlFor={`${index}-ingredient-step`}
            >
              <input
                type="checkbox"
                id={`${index}-ingredient-step`}
                onClick={() => handleCheckInput(ingredient)}
                checked={completedIngredients.includes(ingredient[1])}
              />
              {`${ingredient[1]} - ${measure[index] && measure[index][1]}`}
            </label>
          </p>
        ))}
      </div>

      <p data-testid="instructions">
        {drink.strInstructions}
      </p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={measure.length !== completedIngredients.length}
        onClick={finishRecipe}
      >
        Finish recipe
      </button>

    </div>
  );
}
