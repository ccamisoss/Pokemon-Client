import { Link } from "react-router-dom";
import "../styles/Pokemon.modules.css"

export function Pokemon({ name, image, types, id }) {
  return (
    <Link to={`/pokemon/${id}`}>
      <div>
        <h3>{name}</h3>
        <img src={image} alt="" />
        {types.map((t) => (
          <h5>{t}</h5>
        ))}
      </div>
    </Link>
  );
}
