import { NavBar } from "./NavBar";

export function PokemonCreate() {
  return (
    <div>
      <NavBar />
      <form action="">
        <label>Nombre del Pokemon:</label>
        <input type="text" />
        <label htmlFor="">Altura:</label>
        <input type="text" />
        <label htmlFor="">Peso:</label>
        <input type="text" />
        <label htmlFor="">Vida:</label>
        <input type="text" />
        <label htmlFor="">Ataque:</label>
        <input type="text" />
        <label htmlFor="">Defensa:</label>
        <input type="text" />
        <label htmlFor="">Velocidad:</label>
        <input type="text" />
        <label htmlFor="">Tipo de Pokemon:</label>
        <input type="checkbox" name="Normal" id="Nor" />
        {/* <input type="checkbox" name="" id="" >Fighting</input>
            <input type="checkbox" name="" id="" >Flying</input>
            <input type="checkbox" name="" id="" >Poison</input>
            <input type="checkbox" name="" id="" >Ground</input>
            <input type="checkbox" name="" id="" >Rock</input>
            <input type="checkbox" name="" id="" >Bug</input>
            <input type="checkbox" name="" id="" >Ghost</input>
            <input type="checkbox" name="" id="" >Steel</input>
            <input type="checkbox" name="" id="" >Fire</input>
            <input type="checkbox" name="" id="" >Water</input>
            <input type="checkbox" name="" id="" >Grass</input>
            <input type="checkbox" name="" id="" >Electric</input>
            <input type="checkbox" name="" id="" >Psychic</input>
            <input type="checkbox" name="" id="" >Ice</input>
            <input type="checkbox" name="" id="" >Dragon</input>
            <input type="checkbox" name="" id="" >Dark</input>
            <input type="checkbox" name="" id="" >Fairy</input>
            <input type="checkbox" name="" id="" >Shadow</input> */}
        <button>Crear Pokemon</button>
      </form>
    </div>
  );
}
