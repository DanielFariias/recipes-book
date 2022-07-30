import { IRecipe } from '../../context/RecipesContext/RecipesTypes';
import { RecipeCard } from './RecipeCard';
import { Container } from './styles';

interface IListRecipeCardProps {
  recipes: IRecipe[]
}

export function ListRecipeCard({ recipes }: IListRecipeCardProps) {
  return (
    <Container>
      {
        recipes.map((recipe: IRecipe) => (
          <RecipeCard key={recipe.idDrink || recipe.idMeal} recipe={recipe} />
        ))
      }
    </Container>
  );
}
