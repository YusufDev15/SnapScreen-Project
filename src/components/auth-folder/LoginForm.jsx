import { useState, useEffect } from "react";
import { auth, provider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Add a class to the body when the LoginForm component is mounted
    document.body.classList.add("login-form-page");

    // Clean up the class when the component is unmounted
    return () => {
      document.body.classList.remove("login-form-page");
    };
  }, []);

  function logIn(e) {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid email or password. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleGoogleSignIn() {
    signInWithPopup(auth, provider)
      .then(() => {
        console.log("Google Sign-In successful");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Google Sign-In failed", error);
      });
  }

  return (
    <div className="wrapper">
      <form onSubmit={logIn}>
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember Me
          </label>
          <a href="#">Forgot Password?</a>
        </div>
        {location.state && location.state.successMessage && (
          <p className="success-message">{location.state.successMessage}</p>
        )}
        {loading && <p className="loading-message">Logging in...</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="google-btn"
        >
          <FcGoogle className="google-icon" />
          Sign in with Google
        </button>
        <div className="register-link">
          <p>
            Don't have an account? <Link to="/register">Register?</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
