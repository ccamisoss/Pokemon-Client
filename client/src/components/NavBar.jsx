import { Link } from "react-router-dom";

export function NavBar(){
    return(
    <header>
        <Link to="/home">
            <button>Home</button>
        </Link>
        <Link to="/create">
            <button>Crear Pokemon</button>
        </Link>
    </header>
  )
}