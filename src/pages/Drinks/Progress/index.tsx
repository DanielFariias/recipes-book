import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipeProgress from '../../../components/RecipeProgress';
import LocalStorageService from '../../../services/LocalStorageService';

export default function DrinkProgress() {
  const [drink, setDrink] = useState<any>({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [completedIngredients, setCompletedIngredients] = useState([]);
  const { id } = useParams<any>();
  const history = useHistory();

  function VerifyIsRecipeExistsInLocalStorage() {
    const storage: any = LocalStorageService.get('inProgressRecipes');

    if (!storage) {
      const InitialStorage = {
        cocktails: { [id]: [] },
        meals: {},
      };
      return LocalStorageService.set('inProgressRecipes', InitialStorage);
    }

    const StorageWithNewRecipe = {
      ...storage,
      cocktails: { ...storage.cocktails, [id]: [] },
    };

    const isExists = storage.cocktails[id];

    if (!isExists) {
      return LocalStorageService.set('inProgressRecipes', StorageWithNewRecipe);
    }
    return storage.cocktails[id];
  }

  function checkIsFavoriteRecipe() {
    const storage = LocalStorageService.get('favoriteRecipes');

    if (storage) setIsFavorite(Boolean(storage.find((item) => item.id === id)));
    else setIsFavorite(false);
  }

  function handleCheckInput(ingredient: any) {
    const storage: any = LocalStorageService.get('inProgressRecipes');

    const currentIngredientsList: any = [...storage.cocktails[id]];

    const isExist = currentIngredientsList
      .find((item:any) => item.includes(ingredient[1]));

    if (isExist) {
      const ingredientsList: any = currentIngredientsList
        .filter((item: any) => item !== ingredient[1]);

      const storageWithNewIngredientsList = {
        ...storage,
        cocktails: { ...storage.cocktails, [id]: ingredientsList },
      };

      setCompletedIngredients(ingredientsList);
      LocalStorageService.set('inProgressRecipes', storageWithNewIngredientsList);
    } else {
      currentIngredientsList.push(ingredient[1]);

      const storageWithNewIngredientsList = {
        ...storage,
        cocktails: { ...storage.cocktails, [id]: currentIngredientsList },
      };
      setCompletedIngredients(currentIngredientsList);
      LocalStorageService.set('inProgressRecipes', storageWithNewIngredientsList);
    }
  }

  function handleFinishedRecipe() {
    const storage = LocalStorageService.get('doneRecipes') ?? [];

    const finishedRecipe = {
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

    const StorageWithNewRecipe = [...storage, finishedRecipe];

    LocalStorageService.set('doneRecipes', StorageWithNewRecipe);

    history.push('/done-recipes');
  }

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((json) => setDrink(json.drinks[0]));

    setCompletedIngredients(VerifyIsRecipeExistsInLocalStorage() ?? []);
    checkIsFavoriteRecipe();
  }, []);

  function toggleFavoriteDrink() {
    const storage: any = LocalStorageService.get('favoriteRecipes');

    const NewRecipe = {
      id: drink.idDrink,
      type: 'drink',
      nationality: '',
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
    };

    if (storage) {
      const isExists = storage.find((item: any) => item.id === drink.idDrink);

      if (isExists) {
        const StorageWithoutRecipe = storage
          .filter((item: any) => item.id !== drink.idDrink);

        return LocalStorageService.set('favoriteRecipes', StorageWithoutRecipe);
      }

      return LocalStorageService.set('favoriteRecipes', [...storage, NewRecipe]);
    }

    return LocalStorageService.set('favoriteRecipes', [NewRecipe]);
  }
  return (
    <div>
      {drink.idDrink && (
        <RecipeProgress
          recipe={drink}
          saveFoodAtLocalStorage={toggleFavoriteDrink}
          isFavoritefunction={checkIsFavoriteRecipe}
          isFavorite={isFavorite}
          handleCheckInput={handleCheckInput}
          completedIngredients={completedIngredients}
          finishRecipe={handleFinishedRecipe}
        />
      )}

    </div>

  );
}
