import { Button, Stack, TextField, Typography } from '@mui/material'
import useCreateRecipeForm from '../../../hooks/useCreateRecipeForm'

export default function CreateRecipeForm() {
    const {
        formValues,
        handleFormInput,
        handleFormIngredientsArrayInput,
        handleFormTagsArrayInput,
        rawIngredientsInput,
        rawTagsInput,
        handleSubmit
    } = useCreateRecipeForm()

    return (
        <Stack spacing={2} className="flex items-center" sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Create Recipe
            </Typography>

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
                Submit
            </Button>
        </Stack>
    )
}
