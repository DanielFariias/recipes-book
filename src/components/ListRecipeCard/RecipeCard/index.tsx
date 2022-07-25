import { Link } from 'react-router-dom';
import { IRecipe } from '../../../context/RecipesContext/RecipesTypes';

interface IRecipeCardProps {
  recipe: IRecipe
}

export function RecipeCard({ recipe }: IRecipeCardProps) {
  return (
    <div>
      <Link to={recipe.idDrink
        ? `/drinks/${recipe.idDrink}`
        : `/foods/${recipe.idMeal}`}
      >
        <img
          src={recipe.strDrinkThumb || recipe.strMealThumb}
          alt=""
        />
        <span>{recipe.strDrink || recipe.strMeal }</span>
      </Link>
    </div>
  );
}
