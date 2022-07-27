import copy from 'clipboard-copy';

import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IRecipe } from '../../context/RecipesContext/RecipesTypes';

import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

const styles = {
  width: '100%',
  maxWidth: 360,
};

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

  return (
    <div style={styles}>
      <img
        src={image}
        alt=""

      />
      <h1>{name}</h1>

      <button
        type="button"
        onClick={() => {
          saveRecipeAtLocalStorage();
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
          copy(`http://localhost:3000/foods/${recipe.idMeal}`);
          setIsLinkCopied(true);
        }}
      >
        <img src={shareIcon} alt="" />
      </button>
      {isLinkCopied && <p>Link copied!</p>}

      <br />
      <br />
      <span data-testid="recipe-category">{recipe.strCategory}</span>

      <div>
        {ingredients.map((ingredient, index) => (
          <p key={ingredient[0]}>
            {`${ingredient[1]} - ${measure[index] && measure[index][1]}`}
          </p>
        ))}
      </div>

      <p data-testid="instructions">
        {recipe.strInstructions}
      </p>

      {generateYoutubeLink && (
        <iframe
          data-testid="video"
          src={generateYoutubeLink(recipe.strYoutube) as string}
          width="300"
          height="auto"
          title={`${id} preparation`}
        />
      )}

      <section
        className="recommendations-container"
        style={{
          width: 360,
          overflow: 'hidden',
          overflowX: 'scroll',
          display: 'flex',
          gap: 20,
        }}
      >
        {recomendations.map((item) => {
          const recomendationId = item.idMeal ?? item.idDrink;
          const recomendationImage = item.strMealThumb ?? item.strDrinkThumb;
          const recomendationName = item.strMeal ?? item.strDrink;
          return (
            <div
              key={recomendationId}
            >
              <img src={recomendationImage} alt="" width={200} />
              <p>{recomendationName}</p>
            </div>
          );
        })}
      </section>

      {!isDoneRecipe() && (
        <button
          type="button"
          onClick={() => history.push(doneRecipeReciderect)}
          style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 24,
          }}
        >
          {!isInProgressRecipe() ? 'Start Recipe' : 'Continue Recipe'}
        </button>
      )}

    </div>
  );
}
