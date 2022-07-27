import { IRecipe } from '../context/RecipesContext/RecipesTypes';

export default function filterIngredients(recipes:IRecipe[], key: string) {
  return Object.entries(recipes)
    .filter((item) => item[0].includes(key))
    .filter((item) => (item[1] !== '' && item[1] !== ' ' && item[1] !== null));
}
