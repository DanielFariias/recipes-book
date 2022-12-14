import { useEffect, useState } from 'react';
import Card from '../../components/Card';

import Header from '../../components/Header';
import LocalStorageService from '../../services/LocalStorageService';
import * as C from './styles';

const buttons = ['all', 'food', 'drink'];

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState<any>([]);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const doneRecipes = LocalStorageService.get('doneRecipes') || [];
    setRecipes(doneRecipes);
  }, []);

  function filterRecipe() {
    if (filterType === 'all') return recipes;

    return recipes.filter((recipe: any) => recipe.type === filterType);
  }

  const filteredRecipes = filterRecipe();
  return (
    <C.Container>
      <Header title="Done Recipes" />

      <C.OptionsMenu>
        {buttons.map((button) => (
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

      <div>
        {recipes && filteredRecipes.map((recipe: any) => (
          <Card key={recipe.id} recipe={recipe} />
        ))}
      </div>

    </C.Container>
  );
}
