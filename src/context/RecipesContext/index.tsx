import {
  createContext, useMemo, useState,
} from 'react';
import { IRecipe, IRecipesContext, IRecipesProvider } from './RecipesTypes';

export const RecipesContext = createContext({} as IRecipesContext);

export function RecipesProvider({ children }: IRecipesProvider) {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  function handleAddRecipes(NewRecipes: IRecipe[]) {
    setRecipes(NewRecipes);
  }

  const valueProvider = useMemo(() => ({
    recipes,
    handleAddRecipes,
  }), [recipes, handleAddRecipes]);

  return (
    <RecipesContext.Provider
      value={valueProvider}
    >
      {children}
    </RecipesContext.Provider>
  );
}
