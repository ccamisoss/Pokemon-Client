import { Link } from "react-router-dom";

export function Pokemon({ name, image, types }) {
  return (
    <Link to="/detail">
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
