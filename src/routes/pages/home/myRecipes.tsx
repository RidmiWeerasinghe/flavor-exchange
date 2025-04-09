import Box from "@mui/material/Box";
import { Recipe } from "../../../api/models/types";
import { getRecipesByCreatedById } from "../../../api/service/recipes";
import Spinner from "../../../components/spinner";
import useFetch from "../../../hooks/usefetch";
import { useUserStore } from "../../../store/userStore";
import Grid from "@mui/material/Grid";
import RecipeCard from "../../../components/recipeCard";
import { useNavigate } from "react-router";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';

export default function MyRecipes() {
    const navigate = useNavigate()
    //get current user id from sts
    const currentUserId = 2
    const { data, isLoading, error } = useFetch<Recipe[]>({ apiFunction: getRecipesByCreatedById, args: currentUserId })
    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Spinner />;
    }

    const onRecipePress = (recipe: Recipe) => {
        navigate(`/recipe/${recipe.id}/edit`)
    };

    function handleCreateNewRecipe() {
        navigate(`/my-recipes/new`)
    }

    return (
        <Box
            sx={{
                flexGrow: 1,
                padding: 8,
            }}
        >
            <Grid container spacing={2}>
                {data?.map((recipe, index) => {
                    return (
                        <Grid key={index} size={{ xs: 8, md: 4 }}>
                            <RecipeCard
                                recipe={recipe}
                                onClick={onRecipePress}
                            />
                        </Grid>
                    );
                })}
            </Grid>
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    zIndex: 1000,
                }}
                onClick={handleCreateNewRecipe}
            >
                <AddIcon />
            </Fab>
        </Box>
    )
}
