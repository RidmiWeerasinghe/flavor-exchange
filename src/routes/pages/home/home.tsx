import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Recipe } from "../../../api/models/types";
import { getAllRecipes } from "../../../api/service/recipes";
import useFetch from "../../../hooks/usefetch";
import Spinner from "../../../components/spinner";
import RecipeCard from "../../../components/recipeCard";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function Home() {
    const { data, isLoading, error } = useFetch<Recipe[]>(getAllRecipes);
    const [searchKey, setSearchKey] = useState("");

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchKey(e.target.value);

    const onRecipePress = (recipe: Recipe) => {
        // recipe details route
    };

    const filteredData =
        data?.filter((recipe) =>
            recipe.title.toLowerCase().includes(searchKey.toLowerCase())
        ) || [];

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        throw error;
    }

    return (
        <Box
            sx={{
                flexGrow: 1,
                padding: 8,
            }}
        >
            <Box
                sx={{
                    width: "70%",
                    flexGrow: 1,
                    marginInline: "auto",
                    marginBottom: 4,
                }}
            >
                <TextField
                    fullWidth
                    placeholder="Search..."
                    variant="outlined"
                    size="small"
                    value={searchKey}
                    onChange={handleSearchInput}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Grid container spacing={2}>
                {filteredData.map((recipe, index) => {
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
    );
}
