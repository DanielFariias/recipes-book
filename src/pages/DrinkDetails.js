/* eslint-disable no-use-before-define */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RecipeDetails } from '../components/RecipeDetails';

import DrinkService from '../services/DrinkService';
import FoodServices from '../services/FoodServices';
import LocalStorageService from '../services/LocalStorageService';

import filterIngredients from '../utils/filterIngredients';

export default function DrinkDetails() {
  const [drink, setDrink] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [recomendations, setRecomendations] = useState([]);

  const { id: RecipeId } = useParams();

  useEffect(() => {
    DrinkService.requestById(RecipeId)
      .then((res) => setDrink(res));

    FoodServices.listAll()
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

  function saveFoodAtLocalStorage() {
    const storage = LocalStorageService.get('favoriteRecipes');

    const newRecipe = {
      id: drink.idDrink,
      type: 'drink',
      nationality: '',
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
    };

    if (storage) {
      const isRecipeFavorite = storage.find((recipe) => recipe.id === drink.idDrink);

      if (isRecipeFavorite) {
        const storageWithoutRecipe = storage.filter((item) => item.id !== drink.idDrink);

        return LocalStorageService.set('favoriteRecipes', storageWithoutRecipe);
      }

      return LocalStorageService.set('favoriteRecipes', [...storage, newRecipe]);
    }

    return LocalStorageService.set('favoriteRecipes', [newRecipe]);
  }

  function isDoneRecipe() {
    const storage = LocalStorageService.get('doneRecipes');

    if (storage) {
      return storage.find((recipe) => recipe.id === drink.idDrink);
    }
    return false;
  }

  function isInProgressRecipe() {
    const storage = LocalStorageService.get('inProgressRecipes');

    if (storage) {
      return storage.cocktails[drink.idDrink];
    }

    return false;
  }

  const ingredients = filterIngredients(drink, 'strIngredient');
  const measure = filterIngredients(drink, 'strMeasure');

  return (
    <RecipeDetails
      saveRecipeAtLocalStorage={saveFoodAtLocalStorage}
      isFavoritefunction={VerifyIfRecipeIsFavorite}
      isInProgressRecipe={isInProgressRecipe}
      recomendations={recomendations}
      isDoneRecipe={isDoneRecipe}
      ingredients={ingredients}
      isFavorite={isFavorite}
      measure={measure}
      recipe={drink}
    />
  );
}
