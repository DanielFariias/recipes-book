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

export default function FoodProgress() {
  const [meal, setMeal] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [completedIngredients, setCompletedIngredients] = useState([]);

  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`)
      .then((res) => res.json())
      .then((json) => setMeal(json.meals[0]));

    function localstoragee() {
      const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

      if (!storage) {
        const data = {
          cocktails: {},
          meals: {
            [params.id]: [],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(data));
        return [];
      }

      const isExists = storage.meals[params.id];
      console.log(isExists);

      if (isExists) {
        console.log('Entrei');
        return storage.meals[params.id];
      }

      const data = {
        ...storage,
        meals: {
          ...storage.meals,
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

  function saveFoodAtLocalStorage() {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!storage) {
      const data = [{
        id: meal.idMeal,
        type: 'food',
        nationality: meal.strArea,
        category: meal.strCategory,
        alcoholicOrNot: '',
        name: meal.strMeal,
        image: meal.strMealThumb,
      }];

      return localStorage.setItem('favoriteRecipes', JSON.stringify(data));
    }
    console.log(storage);

    const isExists = storage.find((item) => item.id === meal.idMeal);
    console.log(isExists);

    if (isExists) {
      const newData = storage.filter((item) => item.id !== meal.idMeal);

      return localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
    }

    const data = {
      id: meal.idMeal,
      type: 'food',
      nationality: meal.strArea,
      category: meal.strCategory,
      alcoholicOrNot: '',
      name: meal.strMeal,
      image: meal.strMealThumb,
    };

    const newStorage = [
      ...storage,
      data,
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
  console.log(meal);
  function finishRecipe() {
    const recipe = {
      id: meal.idMeal,
      type: 'food',
      nationality: meal.strArea,
      category: meal.strCategory,
      alcoholicOrNot: '',
      name: meal.strMeal,
      image: meal.strMealThumb,
      doneDate: new Date(),
      tags: meal.strTags.split(','),
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

  function handleCheckInput(ingredient) {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const cocktail = [...storage.meals[params.id]];
    console.log(cocktail);

    const isExist = storage.meals[params.id]
      .filter((item) => item.includes(ingredient[1]));

    if (isExist.length) {
      const newItem = cocktail.filter((item) => item !== ingredient[1]);
      const newStorage = {
        ...storage,
        meals: {
          ...storage.meals,
          [params.id]: newItem,
        },
      };

      setCompletedIngredients(newItem);
      return localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
    }
    cocktail.push(ingredient[1]);

    const newStorage = {
      ...storage,
      meals: {
        ...storage.meals,
        [params.id]: cocktail,
      },
    };
    setCompletedIngredients(cocktail);
    return localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  }

  const ingredients = Object.entries(meal)
    .filter((item) => item[0].includes('strIngredient'))
    .filter((item) => (item[1] !== '' && item[1] !== null));

  const measure = Object.entries(meal)
    .filter((item) => item[0].includes('strMeasure'))
    .filter((item) => (item[1] !== '' && item[1] !== ' ' && item[1] !== null));

  console.log(measure);
  console.log(completedIngredients.length);
  const buttonDisabled = (measure.length !== completedIngredients.length);
  // console.log(buttonDisabled);
  return (
    <div style={styles}>
      <img src={meal.strMealThumb} alt="" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{meal.strMeal}</h1>

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
        data-testid="share-btn"
        type="button"
        onClick={() => {
          copy(`http://localhost:3000/foods/${meal.idMeal}`);
          setIsLinkCopied(true);
        }}
      >
        <img src={shareIcon} alt="" />
      </button>
      { isLinkCopied && <p>Link copied!</p>}
      <br />
      <br />
      <span data-testid="recipe-category">{meal.strCategory}</span>

      <div>
        {ingredients.map((ingredient, index) => (
          <p
            key={ingredient[0]}
            data-testid={`${index}-ingredient-name-and-measure`}
          >
            <label
              htmlFor={`${index}-ingredient-step`}
              data-testid={`${index}-ingredient-step`}
            >
              <input
                type="checkbox"
                onChange={() => handleCheckInput(ingredient)}
                id={`${index}-ingredient-step`}
                checked={completedIngredients.includes(ingredient[1])}
              />
              {`${ingredient[1]} - ${measure[index][1]}`}
            </label>
          </p>
        ))}
      </div>
      <p data-testid="instructions">
        {meal.strInstructions}
      </p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={buttonDisabled}
        onClick={finishRecipe}
      >
        Finish recipe

      </button>
    </div>
  );
}
