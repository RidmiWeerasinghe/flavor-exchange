import { Button, Stack, TextField, Typography } from '@mui/material'
import useCreateRecipeForm from '../../../hooks/useCreateRecipeForm'

export default function CreateRecipeForm() {
    const {
        formValues,
        handleFormInput,
        handleFormArrayInput,
        rawIngredientsInput,
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
                onChange={(e) => handleFormArrayInput(e.target.value)}
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

            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
        </Stack>
    )
}
