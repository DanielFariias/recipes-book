import {
  createContext, ReactNode, useMemo, useState,
} from 'react';

type IRecipe = any

interface IRecipesContext {
  recipes: IRecipe[]
  handleAddRecipes: (NewRecipes: IRecipe[]) => void
}

interface IRecipesProvider {
  children: ReactNode
}

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
