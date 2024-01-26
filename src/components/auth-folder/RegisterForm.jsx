import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "./registerForm.css";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Add a class to the body when the RegisterForm component is mounted
    document.body.classList.add("register-form-page");

    // Clean up the class when the component is unmounted
    return () => {
      document.body.classList.remove("register-form-page");
    };
  }, []);

  function register(e) {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        setSuccessMessage("Registration successful! Please log in.");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        setError("Registration failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="wrapper">
      <form onSubmit={register}>
        <h1>Create an Account</h1>
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
        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {loading && <p className="loading-message">Creating account...</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </button>
        <div className="login-link">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
