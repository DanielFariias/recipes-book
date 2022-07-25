import { Link } from 'react-router-dom';
import { IRecipe } from '../../../context/RecipesContext/RecipesTypes';

interface IRecipeCardProps {
  recipe: IRecipe
}

export function RecipeCard({ recipe }: IRecipeCardProps) {
  const redirectUrl = recipe.idDrink
    ? `/drinks/${recipe.idDrink}`
    : `/foods/${recipe.idMeal}`;

  const recipeImage = recipe.strDrinkThumb ?? recipe.strMealThumb;
  const recipeName = recipe.strDrink ?? recipe.strMeal;

  return (
    <div>
      <Link to={redirectUrl}>
        <img
          src={recipeImage}
          alt=""
        />
        <span>{recipeName}</span>
      </Link>
    </div>
  );
}
