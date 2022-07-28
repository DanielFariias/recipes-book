import copy from 'clipboard-copy';
import { useState } from 'react';
import { IRecipe } from '../../context/RecipesContext/RecipesTypes';

import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import filterIngredients from '../../utils/filterIngredients';

const styles = {
  width: '100%',
  maxWidth: 360,
};

interface IRecipeProgressProps {
  recipe: IRecipe
  saveFoodAtLocalStorage: () => void
  isFavoritefunction: () => void
  isFavorite: any
  handleCheckInput: (ingredient: any) => void
  completedIngredients: any
  finishRecipe: () => void
}

export default function RecipeProgress({
  recipe,
  saveFoodAtLocalStorage,
  isFavoritefunction,
  isFavorite,
  handleCheckInput,
  completedIngredients,
  finishRecipe,
}: IRecipeProgressProps) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const ingredients = filterIngredients(recipe, 'strIngredient');
  const measure = filterIngredients(recipe, 'strMeasure');

  const buttonDisabled = (ingredients.length !== completedIngredients.length);

  const image = recipe.strMealThumb ?? recipe.strDrinkThumb;
  const name = recipe.strMeal ?? recipe.strDrink;

  const copyUrl = recipe.idMeal
    ? `http://localhost:3000/foods/${recipe.idMeal}`
    : `http://localhost:3000/drinks/${recipe.idDrink}`;

  return (
    <div style={styles}>
      <img src={image} alt="" />
      <h1>{name}</h1>

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
        />

      </button>

      <button
        type="button"
        onClick={() => {
          copy(copyUrl);
          setIsLinkCopied(true);
        }}
      >
        <img src={shareIcon} alt="" />
      </button>
      { isLinkCopied && <p>Link copied!</p>}

      <span>{recipe.strCategory}</span>

      <div>
        {measure && ingredients?.map((ingredient: any, index: any) => (
          <p
            key={ingredient[0]}
          >
            <label
              htmlFor={`${index}-ingredient-step`}
            >
              <input
                type="checkbox"
                onChange={() => handleCheckInput(ingredient)}
                id={`${index}-ingredient-step`}
                checked={completedIngredients.includes(ingredient[1])}
              />
              {`${ingredient[1]} - ${measure[index] && measure[index][1]}`}
            </label>
          </p>
        ))}
      </div>
      <p>
        {recipe.strInstructions}
      </p>
      <button
        type="button"
        disabled={buttonDisabled}
        onClick={finishRecipe}
      >
        Finish recipe
      </button>
    </div>
  );
}
