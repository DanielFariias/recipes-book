export async function SearchFoodByIngredients(ingredient) {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const json = await data?.json();

  if (!json?.meals?.length) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  return json.meals;
}

export async function SearchFoodByName(name) {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const json = await data?.json();

  if (!json?.meals?.length) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  return json.meals;
}

export async function SearchFoodByFirstLetter(firstLetter) {
  if (firstLetter.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  }

  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const json = await data?.json();

  if (!json?.meals?.length) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  return json.meals;
}

export async function SearchDrinkByIngredients(ingredient) {
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const json = await data?.json();

  if (!json?.drinks?.length) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  return json.drinks;
}

export async function SearchDrinkByName(name) {
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const json = await data?.json();

  if (!json?.drinks?.length) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  return json.drinks;
}

export async function SearchDrinkByFirstLetter(firstLetter) {
  if (firstLetter.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  }
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const json = await data?.json();

  if (!json?.drinks?.length) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  return json.drinks;
}
