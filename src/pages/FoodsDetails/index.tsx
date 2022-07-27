/* eslint-disable no-use-before-define */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RecipeDetails } from '../../components/RecipeDetails';

import LocalStorageService from '../../services/LocalStorageService';
import DrinkService from '../../services/DrinkService';
import FoodServices from '../../services/FoodServices';

import filterIngredients from '../../utils/filterIngredients';
import { IRecipe } from '../../context/RecipesContext/RecipesTypes';

interface IParams {
  id: string
}

export default function FoodDetails() {
  const [meal, setMeal] = useState<IRecipe>({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [recomendations, setRecomendations] = useState([]);

  const { id: RecipeId } = useParams<IParams>();

  useEffect(() => {
    FoodServices.requestById(RecipeId)
      .then((res) => setMeal(res));

    DrinkService.listAll()
      .then((res) => setRecomendations(res.slice(0, 6)));

    VerifyIfRecipeIsFavorite();
  }, []);

  function VerifyIfRecipeIsFavorite() {
    const storage = LocalStorageService.get('favoriteRecipes');

    if (storage) {
      const isFavoriteRecipeExists = storage.find((item) => item.id === RecipeId);

      setIsFavorite(Boolean(isFavoriteRecipeExists));
    }
  }

  function generateYoutubeLink(youtubeLink: string) {
    if (!youtubeLink) return null;
    const baseEmbedURL = 'https://www.youtube.com/embed/';
    const videoId = youtubeLink.split('v=')[1];
    return `${baseEmbedURL}${videoId}`;
  }

  function saveFoodAtLocalStorage() {
    const storage = LocalStorageService.get('favoriteRecipes');

    const newRecipe = {
      id: meal.idMeal,
      type: 'food',
      nationality: meal.strArea,
      category: meal.strCategory,
      alcoholicOrNot: '',
      name: meal.strMeal,
      image: meal.strMealThumb,
    };

    if (storage) {
      const isRecipeFavorite = storage.find((recipe) => recipe.id === meal.idMeal);

      if (isRecipeFavorite) {
        const storageWithoutRecipe = storage.filter((item) => item.id !== meal.idMeal);
        return LocalStorageService.set('favoriteRecipes', storageWithoutRecipe);
      }

      return LocalStorageService.set('favoriteRecipes', [...storage, newRecipe]);
    }

    return LocalStorageService.set('favoriteRecipes', [newRecipe]);
  }

  function verifyDoneRecipe() {
    const storage = LocalStorageService.get('doneRecipes');

    if (storage) {
      return Boolean(storage.find((recipe) => recipe.id === meal.idMeal));
    }
    return false;
  }

  function verifyProgressRecipe() {
    const storage: any = LocalStorageService.get('inProgressRecipes');

    if (storage) {
      return storage.meals[meal.idMeal];
    }
    return false;
  }

  const ingredients = filterIngredients(meal, 'strIngredient');
  const measure = filterIngredients(meal, 'strMeasure');

  return (
    <RecipeDetails
      saveRecipeAtLocalStorage={saveFoodAtLocalStorage}
      generateYoutubeLink={generateYoutubeLink}
      isInProgressRecipe={verifyProgressRecipe}
      isFavoritefunction={VerifyIfRecipeIsFavorite}
      recomendations={recomendations}
      isDoneRecipe={verifyDoneRecipe}
      ingredients={ingredients}
      isFavorite={isFavorite}
      measure={measure}
      recipe={meal}
    />
  );
}
