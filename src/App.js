import './App.css';
import Menu from './Components/Menu';
import MenuItem from './Components/MenuItem';
import ProtectedRoute from './Components/ProtectedRoute';
import SavedRecipes from './Components/SavedRecipes';
import SignIn from './Components/SignIn';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<SignIn/>}/>
      <Route path="/menu" element={<ProtectedRoute>
              <Menu />
            </ProtectedRoute>}/>
      <Route path="/menu/:id" element={<MenuItem/>}/>
      <Route path="/saved-recipes" element={<SavedRecipes/>}/>
      </Routes>
    </div>
  );
}

export default App;
