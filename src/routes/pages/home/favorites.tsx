import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react'
import RecipeCard from '../../../components/recipeCard';
import useFetch from '../../../hooks/usefetch';
import { getAllRecipes } from '../../../api/service/recipes';
import { Recipe } from '../../../api/models/types';


function Favorites() {
    const { data, isLoading, error } = useFetch<Recipe[]>(getAllRecipes);

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

                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    )
}

export default Favorites
