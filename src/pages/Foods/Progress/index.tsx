import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipeProgress from '../../../components/RecipeProgress';
import FoodServices from '../../../services/FoodServices';
import LocalStorageService from '../../../services/LocalStorageService';

export default function FoodProgress() {
  const [meal, setMeal] = useState<any>({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [completedIngredients, setCompletedIngredients] = useState([]);

  const { id } = useParams<any>();
  const history = useHistory();

  function VerifyIsRecipeExistsInLocalStorage() {
    const storage: any = LocalStorageService.get('inProgressRecipes');

    if (!storage) {
      const InitialStorage = {
        meals: { [id]: [] },
        cocktails: {},
      };
      return LocalStorageService.set('inProgressRecipes', InitialStorage);
    }

    const StorageWithNewRecipe = {
      ...storage,
      meals: { ...storage.meals, [id]: [] },
    };

    const isExists = storage.meals[id];

    if (!isExists) {
      return LocalStorageService.set('inProgressRecipes', StorageWithNewRecipe);
    }
    return storage.meals[id];
  }

  function checkIsFavoriteRecipe() {
    const storage = LocalStorageService.get('favoriteRecipes');

    if (storage) setIsFavorite(Boolean(storage.find((item) => item.id === id)));
    else setIsFavorite(false);
  }

  function toggleFavoriteFood() {
    const storage: any = LocalStorageService.get('favoriteRecipes');

    const NewRecipe = {
      id: meal.idMeal,
      type: 'food',
      nationality: meal.strArea,
      category: meal.strCategory,
      alcoholicOrNot: '',
      name: meal.strMeal,
      image: meal.strMealThumb,
    };

    if (storage) {
      const isExists = storage.find((recipe: any) => recipe.id === meal.idMeal);

      if (isExists) {
        const StorageWithoutRecipe = storage
          .filter((recipe: any) => recipe.id !== meal.idMeal);

        return LocalStorageService.set('favoriteRecipes', StorageWithoutRecipe);
      }

      return LocalStorageService.set('favoriteRecipes', [...storage, NewRecipe]);
    }

    return LocalStorageService.set('favoriteRecipes', [NewRecipe]);
  }

  function handleFinishedRecipe() {
    const storage = LocalStorageService.get('doneRecipes') ?? [];

    const finishedRecipe = {
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

    const StorageWithNewRecipe = [...storage, finishedRecipe];

    LocalStorageService.set('doneRecipes', StorageWithNewRecipe);

    history.push('/done-recipes');
  }

  function handleCheckInput(ingredient: any) {
    const storage: any = LocalStorageService.get('inProgressRecipes');
    const currentIngredientsList: any = [...storage.meals[id]];

    const isExist = currentIngredientsList.find((item:any) => item.includes(ingredient[1]));

    if (isExist) {
      const ingredientsList: any = currentIngredientsList
        .filter((item:any) => item !== ingredient[1]);

      const storageWithNewIngredientsList = {
        ...storage,
        meals: { ...storage.meals, [id]: ingredientsList },
      };

      setCompletedIngredients(ingredientsList);
      LocalStorageService.set('inProgressRecipes', storageWithNewIngredientsList);
    } else {
      currentIngredientsList.push(ingredient[1]);

      const storageWithNewIngredientsList = {
        ...storage,
        meals: { ...storage.meals, [id]: currentIngredientsList },
      };

      setCompletedIngredients(currentIngredientsList);
      LocalStorageService.set('inProgressRecipes', storageWithNewIngredientsList);
    }
  }

  useEffect(() => {
    FoodServices.requestById(id)
      .then((res) => setMeal(res));

    setCompletedIngredients(VerifyIsRecipeExistsInLocalStorage() ?? []);
    checkIsFavoriteRecipe();
  }, []);

  return (
    <RecipeProgress
      recipe={meal}
      saveFoodAtLocalStorage={toggleFavoriteFood}
      isFavoritefunction={checkIsFavoriteRecipe}
      isFavorite={isFavorite}
      handleCheckInput={handleCheckInput}
      completedIngredients={completedIngredients}
      finishRecipe={handleFinishedRecipe}
    />
  );
}
