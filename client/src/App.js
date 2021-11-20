import "./App.css";
import { Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { Home } from "./components/Home";
import { Detail } from "./components/Detail";

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route path='/home' component={Home}/>
      <Route path='/detail' component={Detail}/>
    </div>
  );
}

export default App;
