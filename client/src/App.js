import './App.css';
import { Route } from "react-router-dom";
import Recipe from './components/Recipe/Recipe';
import Detail from './components/Detail/Detail';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import Landing from './components/Landing Page/LandingPage';

function App() {
  return (
    <div className="App">
      <Route exact path = '/' component={Landing}/>
      <Route exact path = '/home' component={Recipe} />
      <Route exact path = '/detail/:id' component={Detail}/>
      <Route exact path = '/createRecipe' component={CreateRecipe}/>
    </div>
  );
}

export default App;
