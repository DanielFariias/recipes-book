import { useContext, useEffect, useState } from 'react';
import { RecipeContent } from '../../components/RecipeContent';
import { RecipesContext } from '../../context/RecipesContext';
import FoodServices from '../../services/FoodServices';

export default function Foods() {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');

  const { recipes, handleAddRecipes } = useContext(RecipesContext);

  useEffect(() => {
    FoodServices.listAll()
      .then((res) => handleAddRecipes(res));

    FoodServices.listCategories()
      .then((res) => setCategories(res.slice(0, 5)));
  }, []);

  function searchByCategory(category: string) {
    const categoryToRequest = (category === 'all' || category === categorySelected)
      ? ''
      : category;

    FoodServices.requestByCategory(categoryToRequest)
      .then((res) => {
        handleAddRecipes(res);
        setCategorySelected(categoryToRequest);
      });
  }

  const firtsRecipes = recipes.slice(0, 12);

  return (
    <RecipeContent
      title="Foods"
      categories={categories}
      recipes={firtsRecipes}
      searchByCategory={searchByCategory}
    />
  );
}
