import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Recipe } from "../../../api/models/types";
import { getAllRecipes } from "../../../api/service/recipes";
import useFetch from "../../../hooks/usefetch";
import Spinner from "../../../components/spinner";
import RecipeCard from "../../../components/recipeCard";
import { TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Home() {
    const navigate = useNavigate()
    const { data, isLoading, error } = useFetch<Recipe[]>({ apiFunction: getAllRecipes });
    const [searchKey, setSearchKey] = useState("");
    const [filterBy, setFilterBy] = useState<'Title' | 'Ingredients' | 'Dietary-Preferences'>('Title');

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchKey(e.target.value);

    const onRecipePress = (recipe: Recipe) => {
        navigate(`/recipe/${recipe.id}`)
    };

    const filteredData = data?.filter((recipe) => {
        const lowerSearchKey = searchKey.toLowerCase();

        if (filterBy === 'Title') {
            return recipe.title.toLowerCase().includes(lowerSearchKey);
        } else if (filterBy === 'Ingredients') {
            return recipe.ingredients.some(ingredient =>
                ingredient.toLowerCase().includes(lowerSearchKey)
            );
        } else if (filterBy === 'Dietary-Preferences') {
            return recipe.tags.some(tags =>
                tags.toLowerCase().includes(lowerSearchKey)
            );
        }

        return false;
    }) || [];

    const handleFilterChange = (e: SelectChangeEvent) => {
        setFilterBy(e.target.value as 'Title' | 'Ingredients' | 'Dietary-Preferences');
    };
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
                    display: "flex"
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
                <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel>Filter by</InputLabel>
                    <Select
                        value={filterBy}
                        label="Filter by"
                        onChange={handleFilterChange}
                    >
                        <MenuItem id="title" value="Title">Title</MenuItem>
                        <MenuItem id="ingredients" value="Ingredients">Ingredients</MenuItem>
                        <MenuItem id="dietary-Preferences" value="Dietary-Preferences">Ingredients</MenuItem>
                    </Select>
                </FormControl>
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
