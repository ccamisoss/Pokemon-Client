/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "../styles/Paginado.module.css"

export default function Paginado({ pokemonsPerPage, pokemons, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(pokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.div}>
        {pageNumbers?.map((n) => (
          <li className={styles.li} key={n}>
            <button onClick={() => paginado(n)}>{n}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
