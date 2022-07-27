import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Foods from './pages/Foods';
import FoodProgress from './pages/FoodProgress';
import Drinks from './pages/Drinks';
import DrinkDetails from './pages/DrinkDetails';
import DrinkProgress from './pages/DrinkProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';

import { RecipesProvider } from './context/RecipesContext';
import FoodDetails from './pages/FoodsDetails';

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
