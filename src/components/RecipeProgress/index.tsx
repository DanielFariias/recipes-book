import copy from 'clipboard-copy';
import { useState } from 'react';
import { ArrowUDownLeft, HeartStraight, ShareNetwork } from 'phosphor-react';
import { Link } from 'react-router-dom';
import { IRecipe } from '../../context/RecipesContext/RecipesTypes';

import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import filterIngredients from '../../utils/filterIngredients';
import * as C from './styles';

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

  const UrlToCopy = recipe.idMeal
    ? `http://localhost:3000/foods/${recipe.idMeal}`
    : `http://localhost:3000/drinks/${recipe.idDrink}`;

  const returnUrl = recipe.idMeal
    ? `/foods/${recipe.idMeal}`
    : `/drinks/${recipe.idDrink}`;

  function handleClickShare() {
    copy(UrlToCopy);
    setIsLinkCopied(true);
  }

  function handleClickFavorite() {
    saveFoodAtLocalStorage();
    isFavoritefunction();
  }

  return (
    <C.Container>
      <C.Header>
        <div className="header-title">
          <Link to={returnUrl}>
            <ArrowUDownLeft
              size={25}
              color="#fff"
              weight="bold"
            />
          </Link>

          <h1>Food</h1>
        </div>

        <div className="header-info">
          <img src={image} alt="" />
        </div>

        <div className="header-menu">
          <button type="button" onClick={handleClickShare}>
            <ShareNetwork
              size={25}
              color="#fff"
              weight="bold"
            />
          </button>

          <h1>{name}</h1>

          <button type="button" onClick={handleClickFavorite}>
            <HeartStraight
              size={25}
              color="#fff"
              weight={isFavorite ? 'fill' : 'bold'}
            />
          </button>
        </div>
        {isLinkCopied && <p>Link copied!</p>}
      </C.Header>

      <C.IngredientsCard>
        <h2>Ingredients</h2>
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
      </C.IngredientsCard>

      <C.InstructionsCard>
        <h2>Ingredients</h2>
        <p>{recipe.strInstructions}</p>
      </C.InstructionsCard>

      <C.FinishButton
        type="button"
        disabled={buttonDisabled}
        onClick={finishRecipe}
      >
        Finish recipe
      </C.FinishButton>
    </C.Container>
  );
}
