import './App.css';
import { Route } from "react-router-dom";
import Recipe from './components/Recipe/Recipe';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <div className="App">
      <Route exact path = '/' component={Recipe}/>
      <Route exact path = '/detail/:id' component={Detail}/>
    </div>
  );
}

export default App;
