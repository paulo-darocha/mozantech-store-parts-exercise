import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <h2 className="Navigation">
      <Link to="/" style={{color: "white"}}>
        Store Parts
      </Link>
    </h2>
  );
};

export default Navigation;