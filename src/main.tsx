import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthLayout from "./routes/layouts/authLayout.tsx";
import Register from "./routes/pages/auth/register.tsx";
import Login from "./routes/pages/auth/login.tsx";
import HomeLayout from "./routes/layouts/homeLayout.tsx";
import Home from "./routes/pages/home/home.tsx";
import MyRecipes from "./routes/pages/home/myRecipes.tsx";
import Favorites from "./routes/pages/home/favorites.tsx";
import RecipeDetails from "./routes/pages/home/recipeDetails.tsx";
import CreateRecipe from "./routes/pages/home/createRecipeForm.tsx";
import UpdateRecipe from "./routes/pages/home/updateRecipeForm.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route element={<AuthLayout />}>
          <Route index path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<HomeLayout />}>
          <Route index path="/home" element={<Home />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
          <Route path="recipe/:recipeId/:edit" element={<RecipeDetails />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/my-recipes/new" element={<CreateRecipe />} />
          <Route path="/my-recipes/update/:recipeId" element={<UpdateRecipe />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
