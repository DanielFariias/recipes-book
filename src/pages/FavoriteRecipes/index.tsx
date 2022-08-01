import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import Header from '../../components/Header';

import LocalStorageService, { IFavoriteRecipe } from '../../services/LocalStorageService';
import * as C from './styles';

const BUTTONS = ['all', 'food', 'drink'];

export default function FavoriteRecipes() {
  const [recipes, setRecipes] = useState<IFavoriteRecipe[]>([]);
  const [filterType, setFilterType] = useState('all');

  function getData() {
    const doneRecipes = LocalStorageService.get('favoriteRecipes');
    setRecipes(doneRecipes);
  }

  useEffect(() => {
    getData();
  }, []);

  function removeFavorite(recipe: any) {
    const newData = recipes.filter((item:any) => item.id !== recipe.id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
    setRecipes(newData);
  }

  function filterRecipe() {
    if (filterType === 'all') return recipes;

    return recipes.filter((recipe:any) => recipe.type === filterType);
  }

  const filteredRecipes = filterRecipe();

  return (
    <div>
      <Header title="Favorite Recipes" />

      <C.OptionsMenu>
        {BUTTONS.map((button) => (
          <button
            key={button}
            type="button"
            onClick={() => setFilterType(button)}
            disabled={!recipes.length}
          >
            {button}
          </button>
        ))}
      </C.OptionsMenu>

      {recipes && filteredRecipes.map((recipe: any) => (
        <Card key={recipe.id} recipe={recipe} removeFavorite={removeFavorite} />

      ))}

    </div>
  );
}
