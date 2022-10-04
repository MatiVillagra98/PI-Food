import './App.css';
import { Route, Switch } from "react-router-dom";
import Recipe from './components/Recipe/Recipe';
import Detail from './components/Detail/Detail';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import Landing from './components/Landing Page/LandingPage';
import Favorites from './components/Favorites/Favorites';
import Error404 from './components/Error/Error404';

function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path = '/' component={Landing}/>
      <Route exact path = '/home' component={Recipe} />
      <Route exact path = '/detail/:id' component={Detail}/>
      <Route exact path = '/createRecipe' component={CreateRecipe}/>
      <Route exact path = '/fav' component={Favorites} />
      <Route component={Error404}/>
    </Switch>
    </div>
  );
}

export default App;
