import "./App.css";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { Home } from "./components/Home";
import { Detail } from "./components/Detail";
import { PokemonCreate } from "./components/PokemonCreate";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pokemon/:id" element={<Detail />} />
        <Route path="/create" element={<PokemonCreate />} />
      </Routes>
    </div>
  );
}

export default App;
