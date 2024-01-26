import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 >
        Hm, the page you were looking for doesnt seem to exist.
      </h1>

      <NavLink to="/" end>
        <button
          className={`ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded transition-all duration-300 h-10 animate__animated`}
        >
          <span className="text-white">Search</span>
        </button>
      </NavLink>
    </div>
  );
};

export default NotFound;
