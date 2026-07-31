
function Navbar() {

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/signin");
//   };

  return (
    <nav className="navbar navbar-expand-lg menu-navbar">
      <div className="container">

        <div>
          <h3 className="logo mb-0">Party Menu</h3>
          <small className="welcome">
            Welcome, Admin User
          </small>
        </div>

        <div className="ms-auto d-flex align-items-center">

          <button
            className="btn btn-outline-light nav-btn me-2"
            // onClick={() => navigate("/saved-recipes")}
          >
            Saved Recipes
          </button>

          <button
            className="btn btn-outline-light nav-btn"
            // onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;