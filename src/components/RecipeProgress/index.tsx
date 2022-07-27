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

  const buttonDisabled = (measure.length !== completedIngredients.length);

  return (
    <div style={styles}>
      <img src={recipe.strMealThumb} alt="" />
      <h1>{recipe.strMeal}</h1>

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
          copy(`http://localhost:3000/foods/${recipe.idMeal}`);
          setIsLinkCopied(true);
        }}
      >
        <img src={shareIcon} alt="" />
      </button>
      { isLinkCopied && <p>Link copied!</p>}

      <span>{recipe.strCategory}</span>

      <div>
        {ingredients.map((ingredient:any, index:any) => (
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
              {`${ingredient[1]} - ${measure[index][1]}`}
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
