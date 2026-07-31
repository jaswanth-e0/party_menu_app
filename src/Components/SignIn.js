import { useState } from "react";
import "../SignIn.css";
import { FaUtensils } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("started");
    if(email.length==0 || password.length==0){
        setError(true)
    }
    else{
        setError(false)
    }
    try {
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
      console.log(data);
      // Redirect
    } catch (err) {
    } finally {
      console.log("ended");
    }
  };
  return (
    <div className="signin-bg d-flex justify-content-center align-items-center">
      <div className="signin-card shadow">
        <div className="text-center mb-4">
          <FaUtensils className="menu-icon" />

          <h1 className="title">Party Menu</h1>

          <p className="subtitle">Sign in to explore our delicious menu</p>
        </div>
        {
            error && <div className="error-message" >Email and password are required</div>
        }
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

          <button className="signin-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
