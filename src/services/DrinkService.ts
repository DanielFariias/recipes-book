const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

class DrinkService {
  async listAll() {
    const response = await fetch(`${BASE_URL}/search.php?s=`);
    const json = await response.json();

    return json.drinks;
  }

  async listCategories() {
    const response = await fetch(`${BASE_URL}/list.php?c=list`);
    const json = await response.json();

    return json.drinks;
  }

  async requestByCategory(category = '') {
    if (!category) {
      const res = await this.listAll();
      return res;
    }

    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const json = await response.json();

    return json.drinks;
  }

  async requestByIngredient(ingredient: string) {
    const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
    const json = await response.json();

    return json.drinks;
  }

  async requestByName(name: string) {
    const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
    const json = await response.json();

    return json.drinks;
  }

  async requestByFirstLetter(firstLetter: string) {
    const response = await fetch(`${BASE_URL}/search.php?f=${firstLetter}`);
    const json = await response.json();

    return json.drinks;
  }
}

export default new DrinkService();
