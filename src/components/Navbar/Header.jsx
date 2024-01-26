import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import PropTypes from "prop-types";
import "./Header.css";
import "animate.css";

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [notificationsActive, setNotificationsActive] = useState(false);
  const [isButtonAnimated, setIsButtonAnimated] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [emptySearch, setEmptySearch] = useState(false); // State to track empty search
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setAuthUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleClick = async () => {
    if (!notificationsActive) {
      setNotificationsActive(true);

      if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          showNotification();
        }
      }
    } else {
      setNotificationsActive(false);
    }
  };

  const showNotification = () => {
    const notification = new Notification("Hey there!", {
      body: "Guess what? You've just received a sneak peek at the latest wallpapers! 🎉",
    });

    notification.onclick = () => {
      console.log("Notification clicked!");
    };
  };

  const buttonClick = () => {
    if (search.trim() === "") {
      setEmptySearch(true);
    } else {
      setEmptySearch(false);
      setIsButtonAnimated(true);
      onSearch(search);

      setTimeout(() => {
        setIsButtonAnimated(false);
      }, 1000);
    }
  };

  return (
    <header
      className={`bg-gray-800 text-white p-4 flex justify-between items-stretch w-full`}
    >
      <div className="flex items-center">
        <NavLink to="/dashboard" end className="text-white">
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/color/48/000000/camera.png"
            alt="camera"
          />{" "}
        </NavLink>

        <input
          type="text"
          placeholder="Search your wallpaper"
          className="px-4 py-2 border border-white rounded text-black focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300 h-10 w-72 placeholder-gray-500"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button
          className={`ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded transition-all duration-300 h-10 animate__animated ${
            isButtonAnimated ? "animate__rubberBand" : ""
          }`}
          onClick={buttonClick}
        >
          <NavLink to="/search" end className="text-white">
            Search
          </NavLink>
        </button>
        {emptySearch && (
          <p className="text-red-500 ml-2">Please enter a search term</p>
        )}
      </div>

      <div className="flex items-center relative">
        <span className="text-3xl font-extrabold tracking-wide animate__animated animate__lightSpeedInRight font-cursive">
          SnapScreen
          <span className="color-wire-animation"></span>
        </span>
      </div>

      <div>
        {authUser ? (
          <div>
            <span className="text-white mr-2">{authUser.email}</span>
            <button
              className="logout-btn"
              style={{
                backgroundColor: "#dc3545",
                color: "#ffffff",
                padding: "10px 20px",
                fontSize: "16px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>

      <div className="flex items-center">
        <button
          className={`px-4 py-2 ${
            notificationsActive
              ? "bg-green-500 hover:bg-green-700"
              : "bg-red-500 hover:bg-red-700"
          } rounded-full bell-icon ${notificationsActive ? "swing" : ""} ${
            notificationsActive ? "notifications-active" : ""
          }`}
          onClick={handleClick}
        >
          🔔
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
