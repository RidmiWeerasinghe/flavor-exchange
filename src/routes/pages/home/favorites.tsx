import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import RecipeCard from '../../../components/recipeCard';
import { useUserStore } from '../../../store/userStore';
import { getRecipes } from '../../../api/service/recipes';
import useFetch from '../../../hooks/usefetch';
import { Recipe } from '../../../api/models/types';
import Spinner from '../../../components/spinner';


function Favorites() {
    const savedRecipes = useUserStore(state => state.savedRecipes)
    const { data, isLoading, error } = useFetch<Recipe[]>({ apiFunction: getRecipes, args: savedRecipes })

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Spinner />;
    }

    function onRecipePress() {

    }
    console.log("data", data)
    console.log("savedRecipes", savedRecipes)
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
        </Box>
    )
}

export default Favorites
