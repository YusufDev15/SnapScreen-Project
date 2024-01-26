import {useEffect} from "react";
import { Link } from "react-router-dom";
import "./home.css";




function Home() {

  useEffect(() => {
    // Add a class to the body when the RegisterForm component is mounted
    document.body.classList.add("home-page");
  
    // Clean up the class when the component is unmounted
    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

  return (
    <div className="home-button-container">
    <h1 className="home-title">Welcome to</h1>
      <Link to="/login" className="home-button">
        SnapScreen
      </Link>
    </div>
  );
}

export default Home;
