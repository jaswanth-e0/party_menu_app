import {  useNavigate } from "react-router-dom";
import "../CSSFiles/SavedRecipes.css";
import "../CSSFiles/navbar.css"
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
function Navbar() {
  const { setIsAuthenticated } = useContext(AuthContext);


  const handleLogout = () => {
    
    localStorage.removeItem("party_menu_token");
    localStorage.removeItem("party_menu_user");
    setIsAuthenticated(false);
    navigate("/");
  };
  const username=JSON.parse(localStorage.getItem("party_menu_user"))
  console.log(username)
  const navigate = useNavigate();
const savedRecipes =
    JSON.parse(localStorage.getItem("party_menu_saved_recipes")) || [];
  return (
  <nav className="menu-navbar">
  <div className="container d-flex navbar-wrapper">

    <div>
      <h3 className="logo mb-0">Party Menu</h3>
      <small className="welcome">{`Welcome, ${username.name}`}</small>
    </div>

    <div className="nav-actions">
      <button
        className="btn btn-outline-light nav-btn"
        onClick={() => navigate("/saved-recipes")}
      >
        {savedRecipes.length > 0
          ? `Saved Recipes (${savedRecipes.length})`
          : "Saved Recipes"}
      </button>

      <button
        className="btn btn-outline-light nav-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>

  </div>
</nav>
  );
}

export default Navbar;