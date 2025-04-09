import { Button, Stack, TextField, Typography } from '@mui/material'
import useUpdateRecipeForm from '../../../hooks/useUpdateRecipeForm'
import { useParams } from 'react-router';
import { getRecipeById } from '../../../api/service/recipes';
import { Recipe } from '../../../api/models/types';
import useFetch from '../../../hooks/usefetch';
import Spinner from '../../../components/spinner';
import { useEffect } from 'react';

export default function UpdateRecipeForm() {
    const params = useParams();
    const {
        formValues,
        handleFormInput,
        handleFormIngredientsArrayInput,
        handleFormTagsArrayInput,
        rawIngredientsInput,
        rawTagsInput,
        handleSubmit,
        initializeFormValues
    } = useUpdateRecipeForm()

    const recipeId = params.recipeId ? parseInt(params.recipeId) : 0;
    const { data, isLoading, error } = useFetch<Recipe>({ apiFunction: getRecipeById, args: recipeId })

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Spinner />;
    }
    useEffect(() => {
        if (data) {
            initializeFormValues(data);
        }
    }, [data]);

    return (
        <Stack spacing={2} className="flex items-center" sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Update Recipe
            </Typography>
            <TextField
                hidden
                value={formValues.id}
            />
            <TextField
                hidden
                value={formValues.ratings}
            />
            <TextField
                label="Title"
                name="title"
                value={formValues.title}
                onChange={handleFormInput}
                fullWidth
                required
            />

            <TextField
                label="Image URL"
                name="image"
                value={formValues.image}
                onChange={handleFormInput}
                fullWidth
            />

            <TextField
                label="Ingredients (comma-separated)"
                name="ingredients"
                value={rawIngredientsInput}
                onChange={(e) => handleFormIngredientsArrayInput(e.target.value)}
                fullWidth
                placeholder="e.g., chicken, salt, pepper"
            />

            <TextField
                label="Instructions"
                name="instructions"
                value={formValues.instructions}
                onChange={handleFormInput}
                multiline
                rows={4}
                fullWidth
            />

            <TextField
                label="Tags (comma-separated)"
                name="tags"
                value={rawTagsInput}
                onChange={(e) => handleFormTagsArrayInput(e.target.value)}
                fullWidth
                placeholder="e.g., high-protein, vegan, gluten-free"
            />

            <Button variant="contained" onClick={handleSubmit}>
                Update
            </Button>
        </Stack>
    )
}
