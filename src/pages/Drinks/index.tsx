import { useContext, useEffect, useState } from 'react';

import { RecipeContent } from '../../components/RecipeContent';
import { RecipesContext } from '../../context/RecipesContext';

import DrinkService from '../../services/DrinkService';

export default function Drinks() {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');

  const { recipes, handleAddRecipes } = useContext(RecipesContext);

  useEffect(() => {
    DrinkService.listAll()
      .then((res) => handleAddRecipes(res));

    DrinkService.listCategories()
      .then((res) => setCategories(res.slice(0, 5)));
  }, []);

  function searchByCategory(category: string) {
    const categoryToRequest = (category === 'all' || category === categorySelected)
      ? ''
      : category;

    DrinkService.requestByCategory(categoryToRequest)
      .then((res) => {
        handleAddRecipes(res);
        setCategorySelected(categoryToRequest);
      });
  }

  const firtsRecipes = recipes.slice(0, 12);

  return (
    <RecipeContent
      title="Drinks"
      categories={categories}
      recipes={firtsRecipes}
      searchByCategory={searchByCategory}
    />
  );
}
