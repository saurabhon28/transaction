import { Link } from "react-router-dom";
import {} from "./navigate.css";

function Navigate() {
  return (
    <div className="Navigate-container">
      <button className="btn">
        <Link to="/transaction">Transaction Table</Link>
      </button>
      <button className="btn">
        <Link to="/stats">Transaction Stats</Link>
      </button>
      <button className="btn">
        <Link to="/barChart">Transaction Bar-Chart</Link>t
      </button>
    </div>
  );
}

export default Navigate;
