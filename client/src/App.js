import "./App.css";
import { Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { Home } from "./components/Home";
import { Detail } from "./components/Detail";
import { PokemonCreate } from "./components/PokemonCreate";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Home} />
      <Route path="/pokemon/:id" component={Detail} />
      <Route exact path="/create" component={PokemonCreate} />
    </div>
  );
}

export default App;
