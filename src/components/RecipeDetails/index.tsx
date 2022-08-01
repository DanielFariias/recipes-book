import copy from 'clipboard-copy';

import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ArrowUDownLeft, HeartStraight, ShareNetwork } from 'phosphor-react';
import { IRecipe } from '../../context/RecipesContext/RecipesTypes';

import * as C from './styles';

interface IRecipeDetailsProps {
  recipe: IRecipe
  measure: [string, string][]
  isFavorite: boolean
  ingredients: [string, string][]
  recomendations: IRecipe[]
  isDoneRecipe: () => boolean
  isFavoritefunction: () => void
  isInProgressRecipe: () => boolean
  saveRecipeAtLocalStorage: () => void
  generateYoutubeLink?: (youtubeLink: string) => string | null
}

export function RecipeDetails({
  recipe,
  isFavoritefunction,
  saveRecipeAtLocalStorage,
  isFavorite,
  ingredients,
  measure,
  generateYoutubeLink,
  recomendations,
  isDoneRecipe,
  isInProgressRecipe,
}: IRecipeDetailsProps) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const history = useHistory();

  const image = recipe.strMealThumb ?? recipe.strDrinkThumb;
  const name = recipe.strMeal ?? recipe.strDrink;
  const id = recipe.idMeal ?? recipe.idDrink;

  const doneRecipeReciderect = recipe.idMeal
    ? `/foods/${recipe.idMeal}/in-progress`
    : `/drinks/${recipe.idDrink}/in-progress`;

  const UrlToCopy = recipe.idMeal
    ? `http://localhost:3000/foods/${recipe.idMeal}`
    : `http://localhost:3000/drinks/${recipe.idDrink}`;

  const returnUrl = recipe.idMeal
    ? '/foods/'
    : '/drinks/';

  function handleClickShare() {
    copy(UrlToCopy);
    setIsLinkCopied(true);
  }

  function handleClickFavorite() {
    saveRecipeAtLocalStorage();
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

          <h2>{name}</h2>

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
        {ingredients.map((ingredient, index) => (
          <p key={ingredient[0]}>
            {`${ingredient[1]} - ${measure[index] && measure[index][1]}`}
          </p>
        ))}
      </C.IngredientsCard>

      <C.InstructionsCard>
        <h2>Instructions</h2>

        <p>
          {recipe.strInstructions}
        </p>
      </C.InstructionsCard>

      {generateYoutubeLink && (
        <C.VideoCard>
          <h2>Tutorial</h2>
          <iframe
            src={generateYoutubeLink(recipe.strYoutube) as string}
            width="300"
            height="auto"
            title={`${id} preparation`}
          />
        </C.VideoCard>
      )}

      <C.RecommendationsCard>
        <h2>Recommendations</h2>

        <div>
          {recomendations.map((item) => {
            const recomendationId = item.idMeal ?? item.idDrink;
            const recomendationImage = item.strMealThumb ?? item.strDrinkThumb;
            const recipeUrl = item.idMeal
              ? `/foods/${recomendationId}`
              : `/drinks/${recomendationId}`;
            return (
              <Link key={recomendationId} to={recipeUrl}>
                <img
                  src={recomendationImage}
                  alt=""
                  width={200}
                />
              </Link>
            );
          })}
        </div>

      </C.RecommendationsCard>

      {!isDoneRecipe() && (
        <C.FinishButton
          type="button"
          onClick={() => history.push(doneRecipeReciderect)}
        >
          {!isInProgressRecipe() ? 'Start Recipe' : 'Continue Recipe'}
        </C.FinishButton>
      )}

    </C.Container>
  );
}
