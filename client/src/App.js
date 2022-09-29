import './App.css';
import { Route } from "react-router-dom";
import Recipe from './components/Recipe/Recipe';
import Detail from './components/Detail/Detail';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import Landing from './components/Landing Page/LandingPage';
import Error404 from './components/Error/404'

function App() {
  return (
    <div className="App">
      <Route exact path = '/' component={Landing}/>
      <Route exact path = '/home' component={Recipe} />
      <Route exact path = '/detail/:id' component={Detail}/>
      <Route exact path = '/createRecipe' component={CreateRecipe}/>
      <Route exact path = '/404' componente={Error404} />
    </div>
  );
}

export default App;
