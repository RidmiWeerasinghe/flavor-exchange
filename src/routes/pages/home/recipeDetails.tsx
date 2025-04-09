import { useNavigate, useParams } from "react-router";
import { Recipe } from "../../../api/models/types";
import useFetch from "../../../hooks/usefetch";
import { deleteRecipe, getRecipeById } from "../../../api/service/recipes";
import Spinner from "../../../components/spinner";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import Fab from "@mui/material/Fab";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'

export default function RecipeDetails() {
    const navigate = useNavigate();
    const params = useParams();
    const { data, isLoading, error } = useFetch<Recipe>({ apiFunction: getRecipeById, args: params.recipeId })

    if (isLoading) {
        return <Spinner />
    } else if (error) {
        return <div>{JSON.stringify(error, null, 2)}</div>
    }

    function handleUpdateRecipe() {
        navigate(`/my-recipes/update/${params.recipeId}`)
    }

    function handleDeleteRecipe(id: string) {
        const recipeId = parseInt(id, 10);
        deleteRecipe(recipeId);
        navigate("/my-recipes");
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
                    border: '1px solid lightgray',
                    borderRadius: 2,
                    padding: 3,
                    maxWidth: 600,
                    margin: '0 auto',
                    boxShadow: 2,
                    backgroundColor: '#fff',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    {data?.title}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {data?.tags.map((item, index) => (
                        <span key={index}>
                            <Typography variant="body1">{item}</Typography>
                        </span>
                    ))}
                </Typography>
                <Box
                    component="img"
                    src={data?.image || "https://st4.depositphotos.com/13349494/27992/i/450/depositphotos_279925888-stock-photo-top-view-raw-meat-fish.jpg"}
                    alt={data?.title}
                    sx={{
                        width: '100%',
                        height: 300,
                        objectFit: 'cover',
                        borderRadius: 2,
                        marginBottom: 2,
                    }}
                />

                <Rating name="read-only" value={data?.ratings} readOnly sx={{ marginBottom: 2 }} />

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>Ingredients</Typography>
                <ul style={{ paddingLeft: '20px' }}>
                    {data?.ingredients.map((item, index) => (
                        <li key={index}>
                            <Typography variant="body1">{item}</Typography>
                        </li>
                    ))}
                </ul>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>Instructions</Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {data?.instructions}
                </Typography>

                <Divider sx={{ my: 2 }} />

            </Box>
            {
                params.edit ? <><Fab
                    color="primary"
                    aria-label="add"
                    sx={{
                        position: 'fixed',
                        bottom: 32,
                        right: 100,
                        zIndex: 1000,
                    }}
                    onClick={handleUpdateRecipe}
                >
                    <EditIcon />
                </Fab>
                    <Fab
                        color="primary"
                        aria-label="add"
                        sx={{
                            position: 'fixed',
                            bottom: 32,
                            right: 32,
                            zIndex: 1000,
                        }}
                        onClick={() => handleDeleteRecipe(params.recipeId ? params.recipeId : "")}
                    >
                        <DeleteIcon />
                    </Fab></> : <></>
            }
        </Box>
    )


}
