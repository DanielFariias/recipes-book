import { ReactNode } from 'react';

export type IRecipe = any

export interface IRecipesContext {
  recipes: IRecipe[]
  handleAddRecipes: (NewRecipes: IRecipe[]) => void
}

export interface IRecipesProvider {
  children: ReactNode
}
