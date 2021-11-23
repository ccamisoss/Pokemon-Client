
export function SearchBar(){
 return(
     <div>
         <div>
         <input type="text" placeholder="Search..."/>
         <button>Buscar Pokemon</button>    
         </div>
         <select name="Orden alfabetico" id="">
             <option value="asc">Nombre ascendente</option>
             <option value="desc">Nombre descendente</option>
         </select>
         <select name="" id="">
             <option value="asc">Fuerza ascendente</option>
             <option value="desc">Fuerza descendente</option>
         </select>
         <select name="type" id="">
             <option value="">Normal</option>
             <option value="">Fighting</option>
             <option value="">Flying</option>
             <option value="">Poison</option>
             <option value="">Ground</option>
             <option value="">Rock</option>
             <option value="">Bug</option>
             <option value="">Ghost</option>
             <option value="">Steel</option>
             <option value="">Fire</option>
             <option value="">Water</option>
             <option value="">Grass</option>
             <option value="">Electric</option>
             <option value="">Psychic</option>
             <option value="">Ice</option>
             <option value="">Dragon</option>
             <option value="">Dark</option>
             <option value="">Fairy</option>
             <option value="">Unknow</option>
             <option value="">Shadow</option>
         </select>
         <select name="" id="">
             <option value="">Creados</option>
             <option value="">Pokeapi</option>
         </select>
     </div>
 )
}