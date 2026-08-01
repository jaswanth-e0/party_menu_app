import { useParams, useNavigate } from "react-router-dom";

import "../CSSFiles/MenuDetails.css";
import menuData from "../data/menuData";
import "../CSSFiles/SavedRecipes.css";
import { useEffect, useState } from "react";

import { FaCheck } from "react-icons/fa";
function MenuItem() {
  const { id } = useParams();

  const savedRecipes = JSON.parse(localStorage.getItem("party_menu_saved_recipes")) || [];
  const navigate = useNavigate();
  const [recipeSaved, setRecipeSaved] = useState(false);
  const recipe = menuData.find((item) => item.id === Number(id));
useEffect(() => {
  const savedRecipes =
    JSON.parse(localStorage.getItem("party_menu_saved_recipes")) || [];

  setRecipeSaved(
    savedRecipes.some(recipe => recipe.id === Number(id))
  );
}, [id]);
  if (!recipe) {
    return <div className="text-center text-white mt-5">Recipe Not Found</div>;
  }
  const handleSaveRecipe = (item) => {
    const savedRecipes = JSON.parse(localStorage.getItem("party_menu_saved_recipes")) || [];

    const alreadySaved = savedRecipes.some((recipe) => recipe.id === item.id);

    let updatedRecipes;

    if (alreadySaved) {
      // Remove
      updatedRecipes = savedRecipes.filter((recipe) => recipe.id !== item.id);
      setRecipeSaved(false)
    } else {
      // Add
      updatedRecipes = [...savedRecipes, item];
      setRecipeSaved(true)
    }
    
    localStorage.setItem("party_menu_saved_recipes", JSON.stringify(updatedRecipes));
  };
  return (
    <div className="details-page">
      <div className="container py-5">
        {/* Top Buttons */}
{/* 
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
            
          <button
            className="btn nav-btn mb-2"
            onClick={() => navigate("/menu")}
          >
            ← Back to Menu
          </button>

          <div>
            <button
              className="btn nav-btn me-2 mb-2"
              onClick={() => navigate("/saved-recipes")}
            >
              Saved Recipes
            </button>

            {!recipeSaved ? (
              <button
                className="btn nav-btn mb-2"
                onClick={() => handleSaveRecipe(recipe)}
              >
                Save Recipe
              </button>
            ) : (
              <button className="saved-btn" onClick={() => handleSaveRecipe(recipe)}>
                <FaCheck className="me-2" />
                Saved
              </button>
            )}
          </div>
        </div> */}
         <div className="top-header mb-4">
  <button
    className="btn nav-btn"
    onClick={() => navigate("/menu")}
  >
    ← Back to Menu
  </button>

  <div className="top-buttons">
    <button
      className="btn nav-btn"
      onClick={() => navigate("/saved-recipes")}
    >
      Saved Recipes
    </button>

    {!recipeSaved ? (
      <button
        className="btn nav-btn"
        onClick={() => handleSaveRecipe(recipe)}
      >
        Save Recipe
      </button>
    ) : (
      <button
        className="saved-btn"
        onClick={() => handleSaveRecipe(recipe)}
      >
        <FaCheck className="me-2" />
        Saved
      </button>
    )}
  </div>
</div>
        {/* Image + Details */}

        <div className="row align-items-start">
          <div className="col-lg-6 mb-4">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="detail-image"
            />
          </div>

          <div className="col-lg-6">
            <div className="mb-3">
              <span className="category-pill me-2">{recipe.category}</span>

              <span className={recipe.isVeg ? "veg-pill" : "nonveg-pill"}>
                {recipe.isVeg ? "Veg" : "Non-Veg"}
              </span>
            </div>

            <h1 className="recipe-heading">{recipe.name}</h1>

            <p className="people">For {recipe.serves} people</p>

            <p className="description">{recipe.description}</p>
          </div>
        </div>

        {/* Ingredients */}

        <div className="ingredients-card mt-5">
          <h3 className="mb-4">Ingredients</h3>

          {recipe.ingredients.map((item, index) => (
            <div key={index} className="ingredient-row">
              <span>{item.name}</span>

              <span>{item.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
