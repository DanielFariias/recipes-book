import { IRecipe } from '../../context/RecipesContext/RecipesTypes';
import Footer from '../Footer';
import Header from '../Header';
import { ListRecipeCard } from '../ListRecipeCard';

type ICategory = any

interface IRecipeContent {
  title: string
  searchByCategory: (category:string) => void
  categories: ICategory[]
  recipes: IRecipe[]
}

export function RecipeContent({
  title, searchByCategory, categories, recipes,
}: IRecipeContent) {
  return (
    <div>
      <Header title={title} hasSearchInput />

      <div>
        <button
          type="button"
          onClick={() => searchByCategory('all')}
        >
          All
        </button>
        {
        categories.map((category) => (
          <button
            key={category.strCategory}
            type="button"
            onClick={() => searchByCategory(category.strCategory)}
          >
            {category.strCategory}
          </button>
        ))
      }
      </div>

      <ListRecipeCard recipes={recipes} />

      <Footer />

    </div>
  );
}
