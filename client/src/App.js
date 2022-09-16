import './App.css';
import { Route } from "react-router-dom";
import Recipe from './components/Recipe/Recipe';

function App() {
  return (
    <div className="App">
      <Route exact path = '/' component={Recipe}/>
    </div>
  );
}

export default App;
