import { useState } from "react";
import "../Menu.css";
import menuData from "../data/menuData";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";


function Menu() {

  const [search, setSearch] = useState("");
  const [category,setCategory]=useState("")
  const [diet,setDiet]=useState("")
  
  return (
    <div className="menu-page">

      <Navbar />

      <div className="container py-4">

        <div className="filter-card ">

          <h6 className="filter-heading d-flex align-items-start">CATEGORY</h6>

          <div className="mb-3 d-flex justify-content-start">

            <button className={`pill ${category=="" && "active"}`} onClick={()=>setCategory('')}>All</button>
            <button className={`pill ${category=="starter" && "active"}`} onClick={()=>setCategory('starter')}>Starter</button>
            <button  className={`pill ${category=="main" && "active"}`} onClick={()=>setCategory('main')}>Main</button>
            <button  className={`pill ${category=="sides" && "active"}`} onClick={()=>setCategory('sides')}>Sides</button>
            <button  className={`pill ${category=="desert" && "active"}`} onClick={()=>setCategory('desert')}>Dessert</button>

          </div>

          <h6 className="filter-heading d-flex align-items-start">DIET</h6>

          <div className="mb-4 d-flex justify-content-start">

            <button className={`pill ${diet=="" && "active"}`} onClick={()=>setDiet('')}>All</button>
            <button className={`pill ${diet=="veg" && "active"}`} onClick={()=>setDiet('veg')}>Veg</button>
            <button className={`pill ${diet=="nonveg" && "active"}`} onClick={()=>setDiet('nonveg')}>Non-Veg</button>

          </div>

          <div className="row">

            <div className="col-lg-10 mb-2">

              <input
                className="form-control search-box"
                placeholder="Search by name (e.g. chicken)"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />

            </div>

            <div className="col-lg-2">

              <button className="btn search-btn w-100" style={{backgroundColor:"orangered"}}> 
                Search
              </button>

            </div>

          </div>

        </div>

        <p className="text-secondary mt-4 d-flex align-items-start">
          {menuData.length} items found
        </p>

        <div className="row">

          {menuData
            .filter(item =>
              item.name.toLowerCase().includes(search.toLowerCase()) 
            )
            .filter(items=> items.category.includes(category))
            
            .map(recipe => (
                
            <div
              className="col-xl-4 col-lg-4 col-md-6 mb-4"
              key={recipe.id}
            >

              <div className="recipe-card">

                <img
                  src={recipe.image}
                  className="recipe-image"
                  alt={recipe.name}
                />

                <div className="recipe-body">

                  <span className="category">
                    {recipe.category}
                  </span>

                  <span
                    className={
                      recipe.diet === "Veg"
                        ? "diet veg"
                        : "diet nonveg"
                    }
                  >
                    {recipe.diet}
                  </span>

                  <h5 className="recipe-title">
                    {recipe.name}
                  </h5>

                  <p className="recipe-desc">
                    {recipe.description}
                  </p>

                  <small className="serves">
                    For {recipe.serves} people
                  </small>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Menu;