import { IRecipe } from '../../context/RecipesContext/RecipesTypes';
import { RecipeCard } from './RecipeCard';

interface IListRecipeCardProps {
  recipes: IRecipe[]
}

export function ListRecipeCard({ recipes }: IListRecipeCardProps) {
  return (
    <div>
      {
        recipes.map((recipe: IRecipe) => (
          <RecipeCard key={recipe.idDrink || recipe.idMeal} recipe={recipe} />
        ))
      }
    </div>
  );
}
