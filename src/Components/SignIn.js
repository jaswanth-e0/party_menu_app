import { useEffect, useState } from "react";
import "../CSSFiles/SignIn.css";
import { FaUtensils } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
function SignIn() {
  const [email, setEmail] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidEmail, setInvalidEMail] = useState(false);
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim()) && email.length>0) {
      setInvalidEMail(true);
      return;
    } else {
      setInvalidEMail(false);
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("started");
    if (email.length == 0 || password.length == 0) {
      setError(true);
    } else {
      setError(false);

      try {
        setLoading(true);
        const response = await fetch(
          "https://serverless-api-teal.vercel.app/api/auth/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Login Failed");
        }

        // Save token
        const token = data.data.token;
        const userData = data.data.user;
        localStorage.setItem("party_menu_token", token);
        localStorage.setItem("party_menu_user", JSON.stringify(userData));
        setIsAuthenticated(true);
        navigate("/menu");
        console.log(token);
        console.log(userData);
        // Redirect
      } catch (err) {
        alert("User is not valid to access or Some thing went wrong");
      } finally {
        console.log("ended");
        setLoading(false);
      }
    }
  };
  const token = localStorage.getItem("party_menu_token");

  if (token) {
    return <Navigate to="/menu" replace />;
  }
  return (
    <div className="signin-bg d-flex justify-content-center align-items-center">
      <div className="signin-card shadow">
        <div className="text-center mb-4">
          <FaUtensils className="menu-icon" />

          <h1 className="title">Party Menu</h1>

          <p className="subtitle">Sign in to explore our delicious menu</p>
        </div>
        {error && (
          <div className="error-message">Email and password are required</div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 10 }}>
            <label htmlFor="email" className="form-label">
              Email
            </label>

            <input
              id="email"
              type="email"
              className="form-control custom-input"
              placeholder="example@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            {invalidEmail && <p style={{color:"red",textAlign:"start"}}>Invalid email format</p>}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              id="password"
              type="password"
              className="form-control custom-input"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="signin-btn">
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
