import { useNavigate } from "react-router-dom";
import "../CSSFiles/SavedRecipes.css"

function SavedRecipes() {
  const navigate = useNavigate();

  const savedRecipes =
    JSON.parse(localStorage.getItem("party_menu_saved_recipes")) || [];

  const removeRecipe = id => {
    const updatedRecipes = savedRecipes.filter(item => item.id !== id);

    localStorage.setItem(
      "party_menu_saved_recipes",
      JSON.stringify(updatedRecipes)
    );

    window.location.reload();
  };

  return (
    <div className="saved-bg">

      <div className="container py-5">

        <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

          <div className="d-flex justify-content-center flex-column align-items-start">

            <h1 className="saved-title">
              Saved Recipes
            </h1>

            <p className="saved-count">
              {savedRecipes.length} recipes saved
            </p>

          </div>
          <button
          style={{backgroundColor:"transparent",color:"white",padding:"10px",border:"1px gray solid"}}
            onClick={() => navigate("/menu")}
          >
            Back to Menu
          </button>

        </div>

        {savedRecipes.length === 0 ? (

          <div className="empty-state">

            <p>No Saved Recipes yet</p>

            <p style={{color:"orange"}} onClick={()=>navigate("/menu")}>
             Browse the menu
            </p>

          </div>

        ) : (

          <div className="row g-4">

            {savedRecipes.map(item => (

              <div
                className="col-lg-4 col-md-6 col-12"
                key={item.id}
              >

                <div className="recipe-card">

                  <div className="position-relative">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="recipe-image"
                    />

                    <span
                      className={`diet-badge ${
                        item.isVeg
                          ? "veg"
                          : "nonveg"
                      }`}
                    >
                      {item.isVeg ? "VEG" : "NON-VEG"}
                    </span>

                  </div>

                  <div className="recipe-body">

                    <p className="category">
                      {item.category.toUpperCase()}
                    </p>

                    <h4>{item.name}</h4>

                    <p className="description">
                      {item.description}
                    </p>

                    <small className="serves">
                      For {item.serves} people
                    </small>

                    <button
                      className="btn remove-btn w-100 mt-3"
                      onClick={() => removeRecipe(item.id)}
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default SavedRecipes;