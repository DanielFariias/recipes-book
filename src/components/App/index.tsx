import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { RecipesProvider } from '../../context/RecipesContext';

import FavoriteRecipes from '../../pages/FavoriteRecipes';
import DoneRecipes from '../../pages/DoneRecipes';
import Profile from '../../pages/Profile';
import Login from '../../pages/Login';

import DrinkProgress from '../../pages/Drinks/Progress';
import DrinkDetails from '../../pages/Drinks/Details';
import Drinks from '../../pages/Drinks';

import FoodProgress from '../../pages/Foods/Progress';
import FoodDetails from '../../pages/Foods/Details';
import Foods from '../../pages/Foods';

export default function App() {
  return (
    <RecipesProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />

          <Route path="/foods" exact component={Foods} />
          <Route path="/foods/:id" exact component={FoodDetails} />
          <Route path="/foods/:id/in-progress" component={FoodProgress} />

          <Route path="/drinks" exact component={Drinks} />
          <Route path="/drinks/:id" exact component={DrinkDetails} />
          <Route path="/drinks/:id/in-progress" component={DrinkProgress} />

          <Route path="/profile" component={Profile} />
          <Route path="/done-recipes" component={DoneRecipes} />
          <Route path="/favorite-recipes" component={FavoriteRecipes} />
        </Switch>
      </BrowserRouter>
    </RecipesProvider>
  );
}
