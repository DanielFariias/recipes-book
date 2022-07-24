class FoodServices {
  async getFoodByIngredients(ingredient: string) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const json = await response.json();

    if (!json?.meals?.length) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    return json.meals;
  }
}

export default new FoodServices();
