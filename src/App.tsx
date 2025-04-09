import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useUserStore } from "./store/userStore";
import { Route, Routes } from "react-router";
import AuthLayout from "./routes/layouts/authLayout";
import HomeLayout from "./routes/layouts/homeLayout";
import Register from "./routes/pages/auth/register";
import Favorites from "./routes/pages/home/favorites";
import MyRecipes from "./routes/pages/home/myRecipes";
import RecipeDetails from "./routes/pages/home/recipeDetails";
import CreateRecipe from "./routes/pages/home/createRecipeForm.tsx";
import UpdateRecipe from "./routes/pages/home/updateRecipeForm.tsx";
import Login from "./routes/pages/auth/login.tsx";
import Home from "./routes/pages/home/home.tsx";

function App() {
  const userAuthenticated = useUserStore(state => state.isAuthenticated);

  return (
    <Routes>
      {userAuthenticated ? (
        <Route element={<HomeLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
          <Route path="recipe/:recipeId/:edit" element={<RecipeDetails />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/my-recipes/new" element={<CreateRecipe />} />
          <Route
            path="/my-recipes/update/:recipeId"
            element={<UpdateRecipe />}
          />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      ) : (
        <Route element={<AuthLayout />}>
          <Route index path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
