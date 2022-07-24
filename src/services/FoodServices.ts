const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

class FoodServices {
  async requestByIngredient(ingredient: string) {
    const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
    const json = await response.json();

    return json.meals;
  }

  async requestByName(name: string) {
    const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
    const json = await response.json();

    return json.meals;
  }

  async requestByFirstLetter(firstLetter: string) {
    const response = await fetch(`${BASE_URL}/search.php?f=${firstLetter}`);
    const json = await response.json();

    return json.meals;
  }
}

export default new FoodServices();
